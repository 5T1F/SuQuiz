import React, { useState, useEffect } from "react";

export default function WordList({ wordsProp, setCurrentWord }) {
  const [words, setWords] = useState([...wordsProp, { status: "before" }]);

  console.log(words);
  useEffect(() => {
    setWords([...wordsProp, { status: "before" }]); // 자꾸 초기화 되는 문제
  }, [wordsProp]);

  const handleWordClick = (clickedWord) => {
    const updatedWords = words.map((word) => {
      if (word.wordName === clickedWord.wordName) {
        return { ...word, status: "now" };
      } else if (word.status === "now") {
        return { ...word, status: "after" };
      }
      return word;
    });

    const newWords = updatedWords.map((word, index) => {
      if (index === words.findIndex((w) => w.wordName === clickedWord.wordName)) {
        return { ...word, status: "now" };
      }
      return word;
    });

    setWords(newWords);
    setCurrentWord(clickedWord);
  };

  if (!words || words.length === 0) {
    return <div>단어 목록이 비어 있습니다.</div>;
  }

  return (
    <>
      {/* 단어사이 간격  space-y-1  */}
      <div className="space-y-1">
        {words.map((word, index) => (
          <div
            key={index}
            onClick={() => handleWordClick(word)}
            className={`flex items-center justify-center h-8 rounded-lg outline-none ${
              word.status === "before"
                ? "bg-white shadow"
                : word.status === "now"
                ? "bg-yellow-200 shadow"
                : "bg-gray-200 shadow-inner"
            }`}
          >
            {word.wordName} - {word.status}
          </div>
        ))}
      </div>
    </>
  );
}
