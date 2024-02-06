import { useState } from "react";
import React from "react";
import { addWordsByUser, deleteWordsByUser } from "../../apis/learningApi";

const CardBox = ({ currentWord, toggleBookmark }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flex flex-col items-center w-96 mx-auto my-5 p-4 border border-gray-300 shadow-md
                transition duration-500 transform hover:shadow-xl cursor-pointer
                ${isFlipped ? "bg-yellow-500" : "bg-white"}`}
      onClick={toggleCard}
    >
      <div className="flex justify-between w-full">
        <button
          className={`ml-auto ${currentWord.isBookmarked ? "bg-yellow-400" : "bg-gray-300"}`}
          onClick={(e) => {
            e.stopPropagation(); // 카드 전체 클릭 방지
            toggleBookmark();
          }}
        >
          {currentWord.isBookmarked ? "북마크에서 빼기" : "북마크추가하기"}
        </button>
      </div>
      <div className="flex justify-center items-center">
        {isFlipped ? (
          <div className="flex justify-center items-center text-white h-20">
            해당 영상의 수어 뜻 : {currentWord.wordName}
          </div>
        ) : (
          <video controls>
            <source src={currentWord.videoUrl} type="video/mp4" />
            영상이 존재하지 않습니다.
          </video>
        )}
      </div>
    </div>
  );
};

const Flashcard = ({ currentWord }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(currentWord.isBookmarked);

  const toggleCard = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleBookmark = async () => {
    // currentWord 매개변수 제거
    const wordUser = {
      userEmail: "dummy@example.com",
      wordName: currentWord.wordName,
    };
    try {
      if (currentWord.isBookmarked) {
        // isBookmarked 상태로 북마크 여부 확인
        await deleteWordsByUser(wordUser);
        console.log("북마크에서 해제: ", currentWord);
      } else {
        await addWordsByUser(wordUser);
        console.log("북마크에 추가: ", currentWord);
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return <CardBox currentWord={{ ...currentWord, isBookmarked }} toggleBookmark={toggleBookmark} />;
};

export default Flashcard;
