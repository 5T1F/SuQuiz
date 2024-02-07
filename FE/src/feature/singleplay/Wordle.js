import React, { useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import Notification from "./Notification";
import GameBoard from "./GameBoard";
import SingleplayModal from "./SingleplayModal";
import { isSolved, dailyQuest, additionalQuest, save } from "../../apis/singleplayApi";

const Wordle = () => {
  const MAX_LETTERS_PER_ROW = 5;
  const MAX_ATTEMPTS = 6;
  const [rightGuess, setRightGuess] = useState("");
  // const [rightGuess] = useState("ㄱㅗㅇㅈㅜ");
  const [colors, setColors] = useState(Array(MAX_LETTERS_PER_ROW * MAX_ATTEMPTS).fill("white"));
  const [notification, setNotification] = useState("");
  const [inputString, setInputString] = useState(""); // 사용자 입력값 상태
  const [history, setHistory] = useState([]); // 이전 입력 기록을 저장할 배열
  const [currentRow, setCurrentRow] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState({ correct: false, trialCount: 0, correctCount: 0, correctText: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const solved = await isSolved("asd@naver.com"); // 사용자의 데일리 문제 풀이 여부 확인

        if (solved.data) {
          const additionalData = await additionalQuest(); // 추가 문제 가져오기
          setRightGuess(additionalData.data.wordName); // 추가 문제를 rightGuess 상태로 설정
          console.log("추가문제 정답:", additionalData.data.wordName);
        } else {
          const dailyData = await dailyQuest(); // 데일리 문제 가져오기
          setRightGuess(dailyData.data.wordName); // 데일리 문제를 rightGuess 상태로 설정
          console.log("데일리문제 정답:", dailyData.data.wordName);
        }
      } catch (error) {
        console.error("Error fetching daily or additional quest:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleEnter = async () => {
    if (inputString.length === MAX_LETTERS_PER_ROW) {
      setNotification("입력완료");
      console.log("Entered value:", inputString);

      // 새로운 색상 계산
      const cellColors = calculateColors(inputString);
      console.log("Calculated colors:", cellColors);

      // 기존 색상 업데이트
      setColors((prevColors) => {
        const startIndex = (currentRow - 1) * MAX_LETTERS_PER_ROW;
        const newColors = [
          ...prevColors.slice(0, startIndex),
          ...cellColors,
          ...prevColors.slice(startIndex + MAX_LETTERS_PER_ROW),
        ];
        console.log("setColors함수 호출 직후:", newColors);
        return newColors;
      });

      await new Promise((resolve) => setTimeout(resolve, 0));

      if (inputString === rightGuess) {
        setNotification("정답입니다! 게임 종료");
        await handleGameEnd("win");
      } else if (currentRow === MAX_ATTEMPTS) {
        setNotification("최대 시도 횟수를 초과했습니다. 게임 종료");
        await handleGameEnd("lose");
      } else {
        setHistory((prevHistory) => [...prevHistory, inputString]);
        setInputString("");
        setCurrentRow(currentRow + 1);
      }
    } else {
      setNotification("5개의 글자를 입력하세요.");
      console.log("5개의 글자를 입력하세요.");
    }
  };

  const calculateColors = (guess) => {
    const colors = [];

    // 정답과 사용자 입력값을 비교하여 색을 결정
    for (let i = 0; i < MAX_LETTERS_PER_ROW; i++) {
      if (guess.charAt(i) === rightGuess.charAt(i)) {
        colors.push("#00C853"); // 자리와 글자가 모두 일치하는 경우 (초록색)
      } else if (rightGuess.includes(guess.charAt(i))) {
        colors.push("#FFEA00"); // 자리는 다르지만 글자가 포함된 경우 (노란색)
      } else {
        colors.push("#C0C0C0"); // 아무 경우도 아닌 경우 (회색)
      }
    }

    return colors;
  };

  const colorsToText = (colors) => {
    console.log("Received colors:", colors);
    return colors
      .map((color) => {
        if (color === "#C0C0C0") return "0";
        if (color === "#FFEA00") return "1";
        if (color === "#00C853") return "2";
        return "";
      })
      .join("");
  };

  // 게임 결과를 저장하는 함수
  const saveGameResult = async (result) => {
    try {
      await save(result); // save 함수를 호출하여 게임 결과를 서버에 저장합니다.
    } catch (error) {
      console.error("Error saving game result:", error);
    }
  };

  // 게임 결과에 따라 모달을 보여줌
  const handleGameEnd = async (res) => {
    const newResult = {
      email: "asd@naver.com",
      trialCount: res === "win" ? currentRow : 0,
      correct: res === "win",
      resultText: colorsToText(colors),
    };

    console.log("결과!!!", newResult);
    setResult(newResult);
    saveGameResult(newResult);
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div>테스트</div>
      <GameBoard inputString={inputString} history={history} colors={colors} />
      <Notification message={notification} />
      <Keyboard
        handleKeyPress={handleKeyPress}
        handleBackspace={handleBackspace}
        handleEnter={handleEnter}
        inputString={inputString}
        rightGuess={rightGuess}
      />
      {showModal && <SingleplayModal result={result} onClose={closeModal} />}
    </div>
  );
};
export default Wordle;
