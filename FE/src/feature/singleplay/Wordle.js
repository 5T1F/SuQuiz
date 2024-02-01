import React, { useState } from "react";
import Keyboard from "./Keyboard";
import Notification from "./Notification";
import Test from "./Test";

const Wordle = () => {
  const MAX_LETTERS_PER_ROW = 5;
  const MAX_ATTEMPTS = 6;
  const [rightGuess] = useState("ㄱㅕㅇㅇㅜ");
  const [currentGuess, setCurrentGuess] = useState(Array(MAX_LETTERS_PER_ROW).fill(""));
  const [colors, setColors] = useState(Array(MAX_LETTERS_PER_ROW * MAX_ATTEMPTS).fill("bg-gray-300"));
  const [notification, setNotification] = useState("");
  const [inputString, setInputString] = useState(""); // 사용자 입력값 상태
  const [history, setHistory] = useState([]); // 이전 입력 기록을 저장할 배열
  const [currentRow, setCurrentRow] = useState(1);

  // Keyboard 컴포넌트에서 문자를 전달받아 inputString 상태 업데이트
  const handleKeyPress = (letter) => {
    if (inputString.length < MAX_LETTERS_PER_ROW) {
      setInputString(inputString + letter);
    }
  };

  const handleBackspace = () => {
    setInputString((prevInputString) => prevInputString.slice(0, -1));
  };

  const handleEnter = () => {
    if (inputString.length === MAX_LETTERS_PER_ROW) {
      // 5개의 글자를 입력했을 때 채점 또는 다른 동작 수행
      setNotification("입력완료");
      console.log("Entered value:", inputString);

      setHistory((prevHistory) => [...prevHistory, inputString]); // history 배열에 inputString 값 추가
      setInputString(""); // inputString 초기화
      setCurrentRow(currentRow + 1); // 다음 줄로 이동
      console.log("history", history);
    } else {
      setNotification("5개의 글자를 입력하세요.");
      console.log("5개의 글자를 입력하세요.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>테스트</div>
      <Test
        inputString={inputString}
        history={history}
        colors={["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]}
      ></Test>
      <Notification message={notification} />
      <Keyboard handleKeyPress={handleKeyPress} handleBackspace={handleBackspace} handleEnter={handleEnter} />
    </div>
  );
};
export default Wordle;
