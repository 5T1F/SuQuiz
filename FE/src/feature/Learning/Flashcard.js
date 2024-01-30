import { useState } from "react";
import React from "react";
import styles from "./Flashcard.module.css";

const CardBox = ({ currentWord, isFlipped, toggleCard, toggleBookmark }) => {
  return (
    <>
      <div
        className={`flex flex-col items-center w-96 mx-auto my-5 p-4 border border-gray-300 shadow-md
                  transition duration-500 transform hover:shadow-xl cursor-pointer
                  ${isFlipped ? "bg-yellow-500" : "bg-white"}`}
        onClick={toggleCard}
      >
        <div>
          <button
            className={`${currentWord.isBookmarked ? "bg-yellow-400" : "bg-gray-300"}`}
            onClick={(e) => {
              e.stopPropagation(); // 카드 전체 클릭 방지
              toggleBookmark();
            }}
          >
            {currentWord.isBookmarked ? "☆" : "☆"}
          </button>
        </div>
        <div className="w-80 h-40 flex justify-center items-center">
          {isFlipped ? (
            <div className="text-white">해당 영상의 수어 뜻 : {currentWord.word}</div>
          ) : (
            <video controls>
              <source src={currentWord.videoUrl} type="video/mp4" />
              영상이 존재하지 않습니다.
            </video>
          )}
        </div>
      </div>
    </>
  );
};

const Flashcard = ({ currentWord }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(currentWord.isBookmarked);

  const toggleCard = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // 북마크 상태 변경 로직을 여기에 추가 (예: API 호출)
  };

  return (
    <CardBox
      currentWord={{ ...currentWord, isBookmarked }}
      isFlipped={isFlipped}
      toggleCard={toggleCard}
      toggleBookmark={toggleBookmark}
    />
  );
};

export default Flashcard;
