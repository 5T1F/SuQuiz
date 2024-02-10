import React, { useState, useEffect } from "react";

export default function WordList({ wordsProp, setCurrentWord }) {
  const [words, setWords] = useState(wordsProp);

  useEffect(() => {
    // wordsProp을 직접적으로 설정하도록 변경
    setWords(wordsProp);
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
      <div className="space-y-1 overflow-y-scroll max-h-full h-[70vh] mt-5">
        {words.map((word, index) => (
          <div
            key={index}
            onClick={() => handleWordClick(word)}
            className={`flex items-center justify-center h-16 rounded-lg ${
              word.status === "after"
                ? "bg-gray-200 shadow-inner"
                : word.status === "now"
                ? "bg-custom-orange shadow"
                : "bg-white shadow"
            }`}
          >
            {word.wordName}
          </div>
        ))}
      </div>
    </>
  );
}
