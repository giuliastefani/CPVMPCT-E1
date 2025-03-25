const express = require('express')
const axios = require('axios');
const path = require('path');

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/pokemon', async (req, res) => {
    const pokemonName = req.body.pokemonName.toLowerCase();

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemonData = response.data;

        res.json({
            name: pokemonData.name,
            id: pokemonData.id,
            image: pokemonData.sprites.front_default,
            types: pokemonData.types.map(type => type.type.name),
            height: pokemonData.height,
            weight: pokemonData.weight,
        });
    } catch (error) {
        res.status(404).json({ error: 'Pokémon não encontrado!' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});