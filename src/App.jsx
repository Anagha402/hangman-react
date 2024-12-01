import React, { useState } from "react";
import "./App.css";

const words = ["react", "javascript", "hangman", "frontend", "backend"];
const maxAttempts = 10;

const App = () => {
  const [selectedWord, setSelectedWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guesses, setGuesses] = useState([]);
  const [attempts, setAttempts] = useState(0);

  const handleGuess = (letter) => {
    if (guesses.includes(letter) || attempts >= maxAttempts) return;

    setGuesses([...guesses, letter]);
    if (!selectedWord.includes(letter)) {
      setAttempts(attempts + 1);
    }
  };

  const restartGame = () => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setGuesses([]);
    setAttempts(0);
  };

  const renderWord = () => {
    return selectedWord
      .split("")
      .map((letter) => (guesses.includes(letter) ? letter : "_"))
      .join(" ");
  };

  const isGameOver = attempts >= maxAttempts;
  const isWinner = selectedWord
    .split("")
    .every((letter) => guesses.includes(letter));

  const hangmanParts = [
    <line key="base" x1="10" y1="90" x2="90" y2="90" />, // Base
    <line key="pole" x1="50" y1="90" x2="50" y2="10" />, // Pole
    <line key="beam" x1="50" y1="10" x2="80" y2="10" />, // Beam
    <line key="rope" x1="80" y1="10" x2="80" y2="20" />, // Rope
    <circle key="head" cx="80" cy="25" r="5" />, // Head
    <line key="body" x1="80" y1="30" x2="80" y2="50" />, // Body
    <line key="left-arm" x1="80" y1="35" x2="75" y2="45" />, // Left Arm
    <line key="right-arm" x1="80" y1="35" x2="85" y2="45" />, // Right Arm
    <line key="left-leg" x1="80" y1="50" x2="75" y2="60" />, // Left Leg
    <line key="right-leg" x1="80" y1="50" x2="85" y2="60" />, // Right Leg
  ];

  return (
    <div className="app">
      <h1>Hangman Game</h1>
      <div className="hangman">
        <svg viewBox="0 0 100 100" className="hangman-drawing">
          {hangmanParts.slice(0, attempts)}
        </svg>
      </div>
      <p className="word">{renderWord()}</p>
      <div className="keyboard">
        {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guesses.includes(letter) || isGameOver || isWinner}
            className={guesses.includes(letter) ? "used" : ""}
          >
            {letter}
          </button>
        ))}
      </div>
      <p>Attempts: {attempts} / {maxAttempts}</p>
      {isGameOver && <p className="message">Game Over! The word was "{selectedWord}".</p>}
      {isWinner && <p className="message">Congratulations! You guessed the word!</p>}
      {(isGameOver || isWinner) && (
        <button className="restart" onClick={restartGame}>
          Restart Game
        </button>
      )}
    </div>
  );
};

export default App;
