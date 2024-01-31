// GameBoard.js
import React from "react";

const GameBoard = ({ currentRow, currentGuess }) => {
  const MAX_LETTERS_PER_ROW = 5;

  return (
    <div className="board-game">
      <div className={`row row-${currentRow}`}>
        {Array.from({ length: MAX_LETTERS_PER_ROW }, (_, index) => (
          <div key={index} className={`letter letter-${index + 1}`}>
            {currentGuess[index] || "-"} {/* 현재 추측된 글자를 표시 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
