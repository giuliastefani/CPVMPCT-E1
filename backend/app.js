const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";
const pokemonCache = {};

const POKEMON_GENERATIONS = {
    gen1: { start: 1, end: 151, name: "Gen 1 (Red/Blue/Yellow)" },
    gen2: { start: 152, end: 251, name: "Gen 2 (Gold/Silver/Crystal)" },
    gen3: { start: 252, end: 386, name: "Gen 3 (Ruby/Sapphire/Emerald)" },
    gen4: { start: 387, end: 493, name: "Gen 4 (Diamond/Pearl/Platinum)" },
    gen5: { start: 494, end: 649, name: "Gen 5 (Black/White)" },
    gen6: { start: 650, end: 721, name: "Gen 6 (X/Y)" },
    gen7: { start: 722, end: 809, name: "Gen 7 (Sun/Moon)" },
    gen8: { start: 810, end: 898, name: "Gen 8 (Sword/Shield)" },
};

app.get("/api/random-pokemon", async (req, res) => {
    try {
        const selectedGens = req.query.generations
            ? req.query.generations.split(",")
            : Object.keys(POKEMON_GENERATIONS);

        let possibleIds = [];
        selectedGens.forEach((gen) => {
            const range = POKEMON_GENERATIONS[gen];
            for (let i = range.start; i <= range.end; i++) {
                possibleIds.push(i);
            }
        });

        const randomId =
            possibleIds[Math.floor(Math.random() * possibleIds.length)];

        if (pokemonCache[randomId]) {
            return res.json(pokemonCache[randomId]);
        }

        const response = await axios.get(
            `${POKEAPI_BASE_URL}/pokemon/${randomId}`
        );
        const pokemonData = {
            id: response.data.id,
            name: response.data.name,
            sprite:
                response.data.sprites.other["official-artwork"].front_default ||
                response.data.sprites.front_default,
            generation: Object.entries(POKEMON_GENERATIONS).find(
                ([_, range]) => randomId >= range.start && randomId <= range.end
            )[0],
        };

        pokemonCache[randomId] = pokemonData;
        res.json(pokemonData);
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        res.status(500).json({ error: "Failed to fetch Pokémon" });
    }
});

app.get("/api/generations", (req, res) => {
    res.json(POKEMON_GENERATIONS);
});

app.post("/api/check-answer", (req, res) => {
    const { pokemonId, guess } = req.body;

    if (!pokemonCache[pokemonId]) {
        return res.status(404).json({ error: "Pokémon not found" });
    }

    const normalizedGuess = guess.toLowerCase().replace(/[^a-z0-9]/g, "");
    const normalizedAnswer = pokemonCache[pokemonId].name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

    const isCorrect = normalizedGuess === normalizedAnswer;
    res.json({
        isCorrect,
        correctAnswer: pokemonCache[pokemonId].name,
        sprite: pokemonCache[pokemonId].sprite,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
