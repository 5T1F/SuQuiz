import React, { useState } from "react";
import Keyboard from "./Keyboard";
import Notification from "./Notification";
import GameBoard from "./GameBoard";
import SingleplayModal from "./SingleplayModal";

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
  const [showModal, setShowModal] = useState(false);
  const [gameResult, setGameResult] = useState(null); // "win" or "lose"

  // Keyboard 컴포넌트에서 문자를 전달받아 inputString 상태 업데이트
  const handleKeyPress = (letter) => {
    if (inputString.length < MAX_LETTERS_PER_ROW) {
      setInputString(inputString + letter);
    } else {
      setNotification("5개 이상의 글자를 입력할 수 없습니다.");
    }
  };

  const handleBackspace = () => {
    setInputString((prevInputString) => prevInputString.slice(0, -1));
  };

  const handleEnter = () => {
    if (inputString.length === MAX_LETTERS_PER_ROW) {
      // 5개의 글자를 입력했을 때
      setNotification("입력완료");
      console.log("Entered value:", inputString);

      let result;
      if (inputString === rightGuess) {
        // 정답과 일치하는 경우
        result = "win";
        setNotification("정답입니다! 게임 종료");
        handleGameEnd(result); // 게임 결과에 따라 모달을 표시
      } else if (currentRow === MAX_ATTEMPTS) {
        // 최대 시도 횟수를 초과한 경우
        result = "lose";
        setNotification("최대 시도 횟수를 초과했습니다. 게임 종료");
        handleGameEnd(result); // 게임 결과에 따라 모달을 표시
      } else {
        setHistory((prevHistory) => [...prevHistory, inputString]); // history 배열에 inputString 값 추가
        setInputString(""); // inputString 초기화
        setCurrentRow(currentRow + 1); // 다음 줄로 이동
      }
    } else {
      setNotification("5개의 글자를 입력하세요.");
      console.log("5개의 글자를 입력하세요.");
    }
  };

  // 게임 결과에 따라 모달을 보여줌
  const handleGameEnd = (result) => {
    setGameResult(result);
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setGameResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>테스트</div>
      <GameBoard
        inputString={inputString}
        history={history}
        colors={["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]}
      />
      <Notification message={notification} />
      <Keyboard handleKeyPress={handleKeyPress} handleBackspace={handleBackspace} handleEnter={handleEnter} />
      {showModal && <SingleplayModal result={gameResult} onClose={closeModal} />}
    </div>
  );
};
export default Wordle;
