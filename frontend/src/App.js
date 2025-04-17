import React, { useState, useEffect } from "react";
import axios from "axios";
import PixelatedImage from "./components/PixelatedImage";
import "./App.css";

function App() {
    const [pokemon, setPokemon] = useState(null);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [guess, setGuess] = useState("");
    const [revealLevel, setRevealLevel] = useState(0);
    const [hintUsed, setHintUsed] = useState(false);
    const [generations, setGenerations] = useState({});
    const [selectedGens, setSelectedGens] = useState([]);
    const [showGenSelect, setShowGenSelect] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/generations")
            .then((response) => {
                setGenerations(response.data);
                setSelectedGens(Object.keys(response.data));
            })
            .catch((error) =>
                console.error("Error fetching generations:", error)
            );
    }, []);

    const fetchRandomPokemon = async () => {
        setIsLoading(true);
        setMessage("");
        setGuess("");
        setRevealLevel(0);
        setHintUsed(false);
        try {
            const response = await axios.get(
                "http://localhost:3001/api/random-pokemon",
                { params: { generations: selectedGens.join(",") } }
            );
            setPokemon(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
            setMessage("Failed to load Pokémon. Please try again.");
            setIsLoading(false);
        }
    };

    const handleGenToggle = (gen) => {
        setSelectedGens((prev) =>
            prev.includes(gen) ? prev.filter((g) => g !== gen) : [...prev, gen]
        );
    };

    const startGame = () => {
        if (selectedGens.length === 0) {
            alert("Por favor, selecione pelo menos uma geração");
            return;
        }
        setShowGenSelect(false);
        fetchRandomPokemon();
    };

    const handleGuessSubmit = async (e) => {
        e.preventDefault();
        if (!guess.trim()) return;

        try {
            const response = await axios.post(
                "http://localhost:3001/api/check-answer",
                {
                    pokemonId: pokemon.id,
                    guess: guess.trim(),
                }
            );

            if (response.data.isCorrect) {
                setScore(score + 1);
                setMessage(
                    `Correto! O Pokémon é ${response.data.correctAnswer}.`
                );
            } else {
                setMessage(
                    `Errado! O Pokémon era ${response.data.correctAnswer}.`
                );
                setGameOver(true);
            }

            setRevealLevel(4);

            if (response.data.isCorrect) {
                setTimeout(() => {
                    fetchRandomPokemon();
                }, 2000);
            }
        } catch (error) {
            console.error("Error checking answer:", error);
            setMessage("Failed to check answer. Please try again.");
        }
    };

    const useHint = () => {
        if (revealLevel < 3 && !hintUsed) {
            setRevealLevel(revealLevel + 1);
            setHintUsed(true);
        }
    };

    const restartGame = () => {
        setScore(0);
        setGameOver(false);
        fetchRandomPokemon();
    };

    const getPixelSize = () => {
        return [16, 8, 4, 1][revealLevel];
    };

    if (showGenSelect) {
        return (
            <div className="app">
                <h1>Who's that Pokémon?</h1>
                <h2>Selecione a geração</h2>
                <div className="generation-select">
                    {Object.entries(generations).map(([key, gen]) => (
                        <div key={key} className="generation-option">
                            <input
                                type="checkbox"
                                id={key}
                                checked={selectedGens.includes(key)}
                                onChange={() => handleGenToggle(key)}
                            />
                            <label htmlFor={key}>{gen.name}</label>
                        </div>
                    ))}
                </div>
                <button onClick={startGame}>Jogar</button>
            </div>
        );
    }

    if (isLoading) {
        return <div className="app">Carregando...</div>;
    }

    if (gameOver) {
        return (
            <div className="app">
                <h1>Who's that Pokémon?</h1>
                <h2>Você perdeu!</h2>
                <p>Sua pontuação final: {score}</p>
                <div className="pokemon-reveal">
                    <PixelatedImage
                        src={pokemon.sprite}
                        pixelSize={1}
                        width={250}
                        height={250}
                    />
                    <p className="pokemon-name">{pokemon.name}</p>
                </div>
                <button onClick={restartGame}>Jogar de novo</button>
            </div>
        );
    }

    const returnToGenSelect = () => {
        if (!gameOver && score > 0) {
            if (
                window.confirm(
                    "Trocar a geração irá resetar seu score. Deseja continuar?"
                )
            ) {
                setShowGenSelect(true);
                setGameOver(false);
                setScore(0);
            }
        } else {
            setShowGenSelect(true);
            setGameOver(false);
            setScore(0);
        }
    };

    return (
        <div className="app">
            <div className="game-header">
                <h1>Who's that Pokémon?</h1>
            </div>

            <h2>Score: {score}</h2>

            {pokemon && (
                <span className="generation-tag">
                    {generations[pokemon.generation]?.name ||
                        pokemon.generation}
                </span>
            )}

            <br></br>

            <button onClick={returnToGenSelect} className="change-gens-btn">
                Trocar geração
            </button>

            <br></br>

            {message && (
                <p
                    className={`message ${
                        message.includes("Correct") ? "correct" : "wrong"
                    }`}
                >
                    {message}
                </p>
            )}

            <br></br>

            <div className="pokemon-container">
                <PixelatedImage
                    src={pokemon.sprite}
                    pixelSize={getPixelSize()}
                />
            </div>

            <form onSubmit={handleGuessSubmit} className="guess-form">
                <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Who's that Pokémon?"
                    autoFocus
                />
                <button type="submit">Advinhar</button>
            </form>

            <div className="hint-section">
                <button
                    onClick={useHint}
                    disabled={hintUsed || revealLevel >= 3}
                    className="hint-button"
                >
                    Usar dica
                </button>
            </div>
        </div>
    );
}

export default App;
