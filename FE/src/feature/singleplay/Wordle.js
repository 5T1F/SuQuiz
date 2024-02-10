import React, { useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import Notification from "./Notification";
import GameBoard from "./GameBoard";
import SingleplayModal from "./SingleplayModal";
import { isSolved, dailyQuest, additionalQuest, save, dailyResult } from "../../apis/singleplayApi";
import { useWordleStore } from "../../app/store";

const Wordle = ({ finger }) => {
  const MAX_LETTERS_PER_ROW = 5;
  const MAX_ATTEMPTS = 6;
  const [rightGuess, setRightGuess] = useState("");
  const [colors, setColors] = useState(Array(MAX_LETTERS_PER_ROW * MAX_ATTEMPTS).fill("white"));
  const [notification, setNotification] = useState("");
  const [inputString, setInputString] = useState(""); // 사용자 입력값 상태
  const [history, setHistory] = useState([]); // 이전 입력 기록을 저장할 배열
  const [currentRow, setCurrentRow] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  const { setModalResult } = useWordleStore();
  const [answer, setAnswer] = useState("");
  const [isSolvedState, setIsSolvedState] = useState(false);
  const [resultText, setResultText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const solved = await isSolved(userId);
        setIsSolvedState(solved.data);
        if (solved.data) {
          const additionalData = await additionalQuest(); // 추가 문제 가져오기
          setRightGuess(additionalData.data.syllables); // 추가 문제를 rightGuess 상태로 설정
          setAnswer(additionalData.data.wordName);
          console.log("추가문제 정답:", additionalData.data.wordName);
        } else {
          const dailyData = await dailyQuest(); // 데일리 문제 가져오기
          setRightGuess(dailyData.data.syllables); // 데일리 문제를 rightGuess 상태로 설정
          setAnswer(dailyData.data.wordName);
          console.log("데일리문제 정답:", dailyData.data.wordName);
        }
      } catch (error) {
        console.error("Error fetching daily or additional quest:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (finger) {
      setInputString((prevInputString) => {
        const newInputString =
          prevInputString.length < MAX_LETTERS_PER_ROW ? prevInputString + finger : prevInputString;
        if (newInputString.length === MAX_LETTERS_PER_ROW) {
          handleEnter();
        }
        return newInputString;
      });
    }
  }, [finger]);

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
      setNotification("입력완료");
      console.log("Entered value:", inputString);

      // 새로운 색상 계산
      const cellColors = calculateColors(inputString);
      console.log("Calculated colors:", cellColors);
      const nowColorText = calculateColorText(inputString);

      // 기존 색상 업데이트
      setColors((prevColors) => {
        const startIndex = (currentRow - 1) * MAX_LETTERS_PER_ROW;
        const newColors = [
          ...prevColors.slice(0, startIndex),
          ...cellColors,
          ...prevColors.slice(startIndex + MAX_LETTERS_PER_ROW),
        ];
        return newColors;
      });

      // resultText 상태 업데이트
      setResultText((prevColorText) => prevColorText + nowColorText);

      if (inputString === rightGuess) {
        setNotification("정답입니다! 게임 종료");
        handleGameEnd("win", nowColorText);
      } else if (currentRow === MAX_ATTEMPTS) {
        setNotification("최대 시도 횟수를 초과했습니다. 게임 종료");
        handleGameEnd("lose", nowColorText);
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

  const calculateColorText = (guess) => {
    let colorText = "";

    // 정답과 사용자 입력값을 비교하여 색을 결정
    for (let i = 0; i < MAX_LETTERS_PER_ROW; i++) {
      if (guess.charAt(i) === rightGuess.charAt(i)) {
        colorText += "2";
      } else if (rightGuess.includes(guess.charAt(i))) {
        colorText += "1";
      } else {
        colorText += "0";
      }
    }

    return colorText;
  };

  // 게임 결과에 따라 모달을 보여줌
  const handleGameEnd = async (res, nowColorText) => {
    // 결과 계산 로직
    const result = {
      userId: userId,
      trialCount: res === "win" ? currentRow : 0,
      correct: res === "win",
      resultText: resultText + nowColorText,
    };

    try {
      await save(result); // 서버에 게임 결과 저장
      console.log("서버에 저장하는 게임 결과:", result);
      fetchResultAndShowModal(res, nowColorText);
    } catch (error) {
      console.error("Error saving game result:", error);
    }
  };

  const fetchResultAndShowModal = async (res, nowColorText) => {
    try {
      const result = await dailyResult(userId); // userId를 기반으로 최신 게임 결과 조회
      console.log("서버에서 가져온 게임 결과:", result);
      // Zustand 스토어에 결과 저장
      setModalResult({
        answer: answer,
        isSolved: isSolvedState,
        resultText: resultText + nowColorText,
        correct: res === "win",
        allTrialCount: result.data.allTrialCount,
        streak: result.data.streak,
        solveCount: result.data.solveCount,
        correctCount: result.data.correctCount,
        trialCount: currentRow,
        maxCorrectCount: result.data.maxCorrectCount,
        trialSpread: result.data.trialSpread,
        correctRate: result.data.correctRate,
      });
      setShowModal(true); // 모달 표시
    } catch (error) {
      console.error("Error fetching game result:", error);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center">
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
      {showModal && <SingleplayModal onClose={closeModal} />}
    </div>
  );
};
export default Wordle;
