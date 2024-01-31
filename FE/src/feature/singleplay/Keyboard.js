import React from "react";

export default function Keyboard({ handleKeyPress, handleBackspace, handleEnter }) {
  const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

  return (
    <>
      <div className="keyboard">
        {ALPHABET.split("").map((letter, index) => (
          <button key={index} onClick={() => handleKeyPress(letter)}>
            {letter}
          </button>
        ))}
        <button onClick={handleBackspace}>Backspace</button>
        <button onClick={handleEnter}>Enter</button>
      </div>
    </>
  );
}
