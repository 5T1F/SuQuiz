import { useState } from "react";
import React from "react";

const Flashcard = ({ currentWord }) => {
  const [showVideo, setShowVideo] = useState(false);

  const toggleCard = () => {
    setShowVideo(!showVideo);
  };

  return (
    <>
      <div onClick={toggleCard}>
        {showVideo ? (
          <div>{currentWord.word}에 해당하는 수어영상</div>
        ) : (
          <video width="320" height="240" controls>
            <source src={currentWord.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </>
  );
};

export default Flashcard;
