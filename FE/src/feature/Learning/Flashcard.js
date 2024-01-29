import { useState } from "react";
import React from "react";
import styles from "./Flashcard.module.css";

const Flashcard = ({ currentWord }) => {
  const [showVideo, setShowVideo] = useState(false);

  const toggleCard = () => {
    setShowVideo(!showVideo);
  };

  return (
    <>
      <div className={styles.flashcard} onClick={toggleCard}>
        {showVideo ? (
          <div>{currentWord.word}에 해당하는 수어영상</div>
        ) : (
          <video width="320" height="240" controls>
            <source src={currentWord.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          // <div className={styles.word}>{currentWord.word}</div>
        )}
      </div>
    </>
  );
};

export default Flashcard;
