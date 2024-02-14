import React, { useState, useEffect, useRef } from "react";

import Keyboard from "./Keyboard";
import Notification from "./Notification";
import GameBoard from "./GameBoard";
import SingleplayModal from "./SingleplayModal";

import { useWordleStore } from "../../app/store";

import { isSolved, dailyQuest, additionalQuest, save, dailyResult } from "../../apis/singleplayApi";
import { wordling } from "../../utils/wordling";
import { syllablesToWord } from "../../utils/syllablesToWord";

import styles from "./Wordle.module.css";

const Wordle = ({ finger }) => {
  const MAX_LETTERS_PER_ROW = 5;
  const MAX_ATTEMPTS = 6;
  const [rightGuess, setRightGuess] = useState("");
  const [colors, setColors] = useState(Array(MAX_LETTERS_PER_ROW * MAX_ATTEMPTS).fill("white"));
  const [cellColors, setCellColors] = useState("");
  const [notification, setNotification] = useState("");
  const [inputString, setInputString] = useState(""); // 사용자 입력값 상태
  const [history, setHistory] = useState([]); // 이전 입력 기록을 저장할 배열
  const [currentRow, setCurrentRow] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  const { modalResult, setModalResult } = useWordleStore();
  const [answer, setAnswer] = useState("");
  const [isSolvedState, setIsSolvedState] = useState(false);
  const [resultText, setResultText] = useState("");

  const [checkEnd, setCheckEnd] = useState(false);
  const [keyboardMaps, setKeyboardMaps] = useState(new Map());
  const [isExist, setIsExist] = useState();

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
          console.log("daily", dailyData.data.syllables);
          setRightGuess(dailyData.data.syllables); // 데일리 문제를 rightGuess 상태로 설정
          setAnswer(dailyData.data.wordName);
          console.log("데일리문제 정답:", dailyData.data.wordName);
        }
      } catch (error) {
        console.error("Error fetching daily or additional quest:", error);
      }
    };

    fetchData();

    // 키보드 초기 세팅
    const initialKeys = [
      ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅒ", "ㅔ", "ㅖ"],
      ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ", "ㅢ"],
      ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", "ㅟ", "ㅚ"],
    ].flat();
    const map = new Map(initialKeys.map((key) => [key, 0]));
    setKeyboardMaps(map);
  }, []);

  useEffect(() => {
    setIsExist(true);
    console.log("input string .....", inputString);
    if (inputString.length === 5) {
      syllablesToWord(inputString).then((res) => {
        console.log(res);

        if (!res) {
          console.log("res ......", res);
          // 붉은색 깜빡임
          setIsExist(false);
          // setIsExist(true);
        }
      });
    }
  }, [inputString]);

  useEffect(() => {
    if (finger) {
      setInputString((prevInputString) => {
        const newInputString =
          prevInputString.length < MAX_LETTERS_PER_ROW ? prevInputString + finger : prevInputString;

        if (newInputString.length === MAX_LETTERS_PER_ROW) {
          console.log("same length .....");
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

  // call when resultText changed
  useEffect(() => {
    console.log("result .......", resultText);

    // 워들판 업데이트
    setColors((prevColors) => {
      const startIndex = (currentRow - 1) * MAX_LETTERS_PER_ROW;
      const newColors = [
        ...prevColors.slice(0, startIndex),
        ...cellColors,
        ...prevColors.slice(startIndex + MAX_LETTERS_PER_ROW),
      ];
      return newColors;
    });

    const ending = async () => {
      if (inputString === rightGuess) {
        setCheckEnd(true);
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
    };

    if (inputString !== "") {
      ending(); //.then(setShowModal(true));
    }
  }, [resultText]);

  // call when changed cellColors
  useEffect(() => {
    console.log("cell colors ...", cellColors);

    if (checkEnd) {
      // 결과 다시 볼 때 동작
      console.log("check end is true => return...");
      setShowModal(true);
      return;
    } else if (!checkEnd && inputString === "") {
      // 최초 진입 시 동작
      return;
    }

    let nowColorText = "";
    nowColorText += calculateColorText(inputString); // 동기적으로 동작

    // resultText 상태 업데이트
    // call useEffect - resultText
    setResultText((prevColorText) => prevColorText + nowColorText);
  }, [cellColors]);

  const handleEnter = async () => {
    // inputString : 한줄 입력값
    if (inputString.length === MAX_LETTERS_PER_ROW) {
      setNotification("입력완료");

      const inputColors = wordling(rightGuess, inputString); // inputColors : 0,1,2로 이루어진 String
      const lineColors = calculateColors(inputColors); // (inputColors)0, 1, 2 -> (lineColors)회샥, 노란, 초록

      console.log("input colors, line colors", inputColors, lineColors);

      // 키보드 업데이트
      for (let i = 0; i < 5; i++) {
        if (inputColors[i] === 2) {
          setKeyboardMaps((prev) => new Map(prev).set(inputString.charAt(i), inputColors[i]));
        } else if (inputColors[i] === 1) {
          if (keyboardMaps.get(inputString.charAt(i)) < 1) {
            setKeyboardMaps((prev) => new Map(prev).set(inputString.charAt(i), inputColors[i]));
          }
        }
      }

      console.log("keyboard maps ....", keyboardMaps);

      setCellColors(lineColors);
    } else {
      setNotification("5개의 글자를 입력하세요.");
      console.log("5개의 글자를 입력하세요.");
    }
  };

  const calculateColors = (inputColors) => {
    const colors = [];

    for (let i = 0; i < inputColors.length; i++) {
      if (inputColors[i] === 2) {
        colors.push("#97ce9b");
      } else if (inputColors[i] === 1) {
        colors.push("#f6e58d");
      } else {
        colors.push("#C0C0C0");
      }
    }
    return colors;
  };

  const calculateColorText = (guess) => {
    console.log("guess", guess, "right guess", rightGuess);
    if (rightGuess === "") return "";
    let colorText = "";

    // 정답과 사용자 입력값을 비교하여 색을 결정
    for (let i = 0; i < MAX_LETTERS_PER_ROW; i++) {
      if (guess.charAt(i) === rightGuess.charAt(i)) {
        colorText += "🟩";
      } else if (rightGuess.includes(guess.charAt(i))) {
        colorText += "🟨";
      } else {
        colorText += "🤍";
      }
    }

    return colorText;
  };

  // 게임 결과에 따라 모달을 보여줌
  const handleGameEnd = async (res) => {
    console.log("handle game end result .....", resultText);

    // 결과 계산 로직
    const result = {
      userId: userId,
      trialCount: res === "win" ? currentRow : 0,
      correct: res === "win",
      resultText: resultText,
    };

    try {
      await save(result); // 서버에 게임 결과 저장
      console.log("서버에 저장하는 게임 결과:", result); // 이 부분을 수정
      await fetchResultAndShowModal(res);

      setShowModal(true);
    } catch (error) {
      console.error("Error saving game result:", error);
    }
  };

  const fetchResultAndShowModal = async (res) => {
    try {
      console.log("user id", userId);
      const result = await dailyResult(userId); // userId를 기반으로 최신 게임 결과 조회
      console.log("서버에서 가져온 게임 결과:", result);

      // Zustand 스토어에 결과 저장, setModalResult가 동기적으로 동작
      setModalResult({
        answer: answer,
        isSolved: isSolvedState,
        resultText: resultText,
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
    } catch (error) {
      console.error("Error fetching game result:", error);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.solvedStateContainer}>{isSolvedState ? "추가 문제" : "오늘의 문제"}</div>
      <div className={styles.boardContainer}>
        <div className={styles.gameboardContainer}>
          <GameBoard inputString={inputString} history={history} colors={colors} />
        </div>
        <div className={styles.notification}>
          <Notification message={notification} />
        </div>
        <div>
          <Keyboard
            className={styles.keyboardContainer}
            handleEnter={handleEnter}
            handleBackspace={handleBackspace}
            keyboardMaps={keyboardMaps}
            handleKeyPress={handleKeyPress}
          />
        </div>
      </div>
      {showModal && <SingleplayModal onClose={closeModal} />}
    </div>
  );
};
export default Wordle;
