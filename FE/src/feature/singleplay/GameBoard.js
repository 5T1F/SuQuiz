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
                  width: "40px", // 각 셀의 너비
                  height: "40px", // 각 셀의 높이
                  backgroundColor: colors[index] || "white", // 셀의 배경
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "15%",
                  margin: "3px 2px",
                  fontWeight: "bold",
                  color: "red",
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
                  width: "40px", // 각 셀의 너비
                  height: "40px", // 각 셀의 높이
                  backgroundColor: colors[index] || "white", // 셀의 배경
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "15%",
                  margin: "3px 2px",
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
  {
    /* <div>
          {Array.from({ length: 5 }, (_, colIndex) => {
            const index = rowIndex * 5 + colIndex;
            const style = {
              width: "40px", // 각 셀의 너비
              height: "40px", // 각 셀의 높이
              backgroundColor: colors[index] || "white", // 셀의 배경
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "15%",
              margin: "3px 2px",
              fontWeight: "bold",
              color: "red",
            };

          })}
        </div>; */
  }

  const renderCells = (input) => {
    // let charIndex = 0;
    // let lastLettersIndex = -1;
    // for (let r = 0; r < 6; r++) {
    //   for (let c = 0; c < 5; c++) {}
    // }
    //   for (let row = 0; row < 6; row++) {
    //     const rowCells = []; // 각 줄의 셀을 담을 배열
    //     for (let col = 0; col < 5; col++) {
    //       // console.log("char index .....", input[charIndex]);
    //       if (lastLettersIndex === -1 && input[charIndex] === undefined) {
    //         lastLettersIndex = row - 1;
    //       }
    //       const currentChar = input[charIndex] || ""; // 현재 인덱스의 문자를 가져옴
    //       console.log("exist ... last letter index ...", isExist, lastLettersIndex);
    //       if (!isExist && lastLettersIndex !== -1) {
    //         console.log("red ......");
    //         cellStyle = {
    //           width: "40px", // 각 셀의 너비
    //           height: "40px", // 각 셀의 높이
    //           backgroundColor: colors[row * 5 + col] || "white", // 셀의 배경
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //           borderRadius: "15%",
    //           margin: "3px 2px",
    //           weight: "bold",
    //           color: "red",
    //         };
    //       } else {
    //         console.log("black ......");
    //         cellStyle = {
    //           width: "40px", // 각 셀의 너비
    //           height: "40px", // 각 셀의 높이
    //           backgroundColor: colors[row * 5 + col] || "white", // 셀의 배경
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //           borderRadius: "15%",
    //           margin: "3px 2px",
    //           color: "blue",
    //         };
    //       }
    //       rowCells.push(
    //         <div key={`${row}-${col}`} style={cellStyle}>
    //           {currentChar ? currentChar : ""}
    //         </div>
    //       );
    //       charIndex++; // 다음 문자 인덱스로 이동
    //     }
    //     cells.push(
    //       <div className="flex" key={row}>
    //         {rowCells}
    //       </div>
    //     ); // 각 줄의 셀을 추가
    //   }
    //   return cells;
    // };
    // 이전 입력 기록과 현재 입력을 합쳐서 하나의 그리드에 표시함
    // const combinedInput = [...historyArray, inputString].join("");
    // const combinedCells = renderCells(combinedInput);
  };
}

export default GameBoard;

export const Cell = ({ char, style }) => {
  return <div style={style}>{char}</div>;
};
