// Wordle.js
import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import Keyboard from "./Keyboard";
import Notification from "./Notification";

export default function Wordle() {
  const [database, setDatabase] = useState([]);
  const [rightGuess, setRightGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(1);
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentLetterPosition, setCurrentLetterPosition] = useState(1);
  const [notification, setNotification] = useState("");

  const MAX_LETTERS_PER_ROW = 5;
  const MAX_ATTEMPTS = 6;

  useEffect(() => {
    // 데이터베이스 로딩 등의 초기화 작업 수행
    loadWords();
  }, []);

  const loadWords = async () => {
    try {
      const response = await fetch("./resources/assets/json/database.json");
      const data = await response.json();
      setDatabase(data.words);
      setRightGuess(getOneRandomWord(data.words));
    } catch (error) {
      console.error("Error loading words:", error);
    }
  };

  const getOneRandomWord = (wordsList) => {
    const shuffleIndex = Math.floor(Math.random() * wordsList.length);
    return wordsList[shuffleIndex].toLowerCase();
  };

  const handleKeyPress = (letter) => {
    if (currentGuess.length >= MAX_LETTERS_PER_ROW) {
      setNotification("Reach Max letter per row");
      return;
    }

    setCurrentGuess(currentGuess + letter);
    setCurrentLetterPosition(currentLetterPosition + 1);
  };

  const handleBackspace = () => {
    if (currentGuess.length === 0) {
      setNotification("Could not erase when is an empty guess");
      return;
    }

    setCurrentGuess(currentGuess.slice(0, -1));
    setCurrentLetterPosition(currentLetterPosition - 1);
  };

  const handleEnter = () => {
    if (currentGuess.length === 0) {
      setNotification("Empty guess");
      return;
    }

    if (currentGuess.toLowerCase() === rightGuess) {
      setNotification("You guessed right! Game over!");
      // 게임 종료 로직 추가
      return;
    }

    if (currentRow >= MAX_ATTEMPTS) {
      setNotification("Reach Max Attempts");
      // 게임 종료 로직 추가
      return;
    }

    // 다음 행으로 이동
    setCurrentRow(currentRow + 1);
    setCurrentGuess("");
    setCurrentLetterPosition(1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <GameBoard currentRow={currentRow} currentGuess={currentGuess} />
      <Keyboard handleKeyPress={handleKeyPress} handleBackspace={handleBackspace} handleEnter={handleEnter} />
      <Notification message={notification} />
    </div>
  );
}
