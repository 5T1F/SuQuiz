import React, { useEffect, useState } from "react";

function GameBoard({ inputString, history, colors, isExist }) {
  // history가 배열이 아닌 경우 배열로 변환
  const historyArray = Array.isArray(history) ? history : [history];

  const [cells, setCells] = useState([]);

  useEffect(() => {
    inputString = [...historyArray, inputString].join("");
    const currentIndex = inputString.length / 5 - 1;
    const createGrid = () => {
      console.log("history ....", inputString, history, colors, isExist);
      const newCells = Array.from({ length: 6 }, (_, rowIndex) => {
        console.log("input string length", inputString.length, currentIndex);

        if (!isExist && rowIndex === currentIndex) {
          return (
            <div key={rowIndex} style={{ display: "flex" }}>
              {Array.from({ length: 5 }, (_, colIndex) => {
                const index = rowIndex * 5 + colIndex;
                const style = {
                  width: "45px", // 각 셀의 너비
                  height: "45px", // 각 셀의 높이
                  backgroundColor: colors[index] || "white", // 셀의 배경
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "15%",
                  margin: "3px 2px",
                  fontWeight: "bold",
                  color: "red",
                  fontSize: "25px",
                };

                return <Cell key={index} char={inputString[index]} style={style}></Cell>;
              })}
            </div>
          );
        } else {
          return (
            <div key={rowIndex} style={{ display: "flex" }}>
              {Array.from({ length: 5 }, (_, colIndex) => {
                const index = rowIndex * 5 + colIndex;
                const style = {
                  width: "45px", // 각 셀의 너비
                  height: "45px", // 각 셀의 높이
                  backgroundColor: colors[index] || "white", // 셀의 배경
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "15%",
                  margin: "3px 2px",
                  fontSize: "25px",
                };

                return <Cell key={index} char={inputString[index]} style={style}></Cell>;
              })}
            </div>
          );
        }
      });

      setCells(newCells);
    };

    createGrid();
  }, [inputString, colors, isExist]);

  return <div>{cells}</div>;
}

export default GameBoard;

export const Cell = ({ char, style }) => {
  return <div style={style}>{char}</div>;
};
