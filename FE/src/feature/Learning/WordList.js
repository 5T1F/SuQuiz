import React, { useState, useEffect } from "react";
import styles from "./WordList.module.css";

export default function WordList({ wordsProp, setCurrentWord }) {
  // console.log("WordList에서 받은 wordsProp:", wordsProp); // 초기 props 값 확인
  const [words, setWords] = useState(wordsProp || []);
  // const [currentWord, setCurrentWord] = useState(null);

  useEffect(() => {
    // 외부에서 전달받은 단어 목록으로 초기화
    setWords(wordsProp || []);
  }, [wordsProp]);

  const handleWordClick = (clickedWord) => {
    setWords(
      words.map((word) => {
        if (word.word === clickedWord.word) {
          return { ...word, status: "now" };
        } else if (word.status === "now") {
          return { ...word, status: "after" };
        }
        return word;
      })
    );

    setCurrentWord(clickedWord);
  };

  // words가 비어있거나 undefined인 경우 대비
  if (!words || words.length === 0) {
    return <div>단어 목록이 비어 있습니다.</div>;
  }

  return (
    <>
      <div>
        {/* 나중에 key를 index말고 단어의 고유식별자를 key로 사용할 것 */}
        {wordsProp.map((word, index) => (
          <div
            key={index}
            onClick={() => handleWordClick(word)}
            className={`${styles["word-box"]} ${styles[word.status]}`}
          >
            {word.word} - {word.status}
          </div>
        ))}
      </div>
    </>
  );
}
