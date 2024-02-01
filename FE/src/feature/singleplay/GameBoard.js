import React, { useState } from "react";

function Gameboard({ inputString, history, colors }) {
  // history가 배열이 아닌 경우 배열로 변환
  const historyArray = Array.isArray(history) ? history : [history];

  const renderCells = (input) => {
    const cells = [];
    let charIndex = 0;
    for (let row = 0; row < 6; row++) {
      const rowCells = []; // 각 줄의 셀을 담을 배열
      for (let col = 0; col < 5; col++) {
        const currentChar = input[charIndex] || ""; // 현재 인덱스의 문자를 가져옴
        const cellStyle = {
          width: "40px", // 각 셀의 너비
          height: "40px", // 각 셀의 높이
          backgroundColor: colors[charIndex] || "white", // 셀의 배경색
          border: "1px solid black", // 셀의 테두리
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        };

        rowCells.push(
          <div key={`${row}-${col}`} style={cellStyle}>
            {currentChar ? currentChar : ""}
          </div>
        );
        charIndex++; // 다음 문자 인덱스로 이동
      }
      cells.push(
        <div className="flex" key={row}>
          {rowCells}
        </div>
      ); // 각 줄의 셀을 추가
    }
    return cells;
  };

  // 이전 입력 기록과 현재 입력을 합쳐서 하나의 그리드에 표시
  const combinedInput = [...historyArray, inputString].join("");
  const combinedCells = renderCells(combinedInput);

  return <div>{combinedCells}</div>;
}

export default Gameboard;
