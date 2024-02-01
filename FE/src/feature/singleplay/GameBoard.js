import React from "react";

const GameBoard = ({ colors, currentGuess }) => {
  const renderRow = (rowIndex) => {
    const cells = [];
    for (let i = 0; i < 5; i++) {
      const index = (rowIndex - 1) * 5 + i;
      const cellStyle = {
        width: "40px", // 각 셀의 너비
        height: "40px", // 각 셀의 높이
        backgroundColor: colors[index] || "white", // 셀의 배경색
        border: "1px solid black", // 셀의 테두리
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };

      cells.push(
        <div key={i} style={cellStyle}>
          {currentGuess[index] ? currentGuess[index] : ""}
        </div>
      );
    }
    return cells;
  };

  const rows = [];
  for (let i = 1; i <= 6; i++) {
    rows.push(
      <div key={i} style={{ display: "flex", marginBottom: "5px" }}>
        {renderRow(i)}
      </div>
    );
  }

  return <div className="game-board">{rows}</div>;
};

export default GameBoard;
