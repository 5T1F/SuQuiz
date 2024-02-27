import React, { useState, useEffect } from "react";
import { addWordsByUser, deleteWordsByUser } from "../../apis/learningApi";
import Lottie from "react-lottie";
import star from "../../assets/lottie/star.json";
import yellowStar from "../../assets/icons/yellow_star.png";
import blackStar from "../../assets/icons/black_star.png";
import styles from "./Flashcard.module.css";
import { motion } from "framer-motion";

// 북마크 버튼 컴포넌트
const BookmarkButton = ({ isBookmarked, toggleBookmark }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    setShowAnimation(true);
    toggleBookmark(e);
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: star,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div onClick={handleBookmarkClick}>
      {showAnimation ? (
        <Lottie options={defaultOptions} height={30} width={30} />
      ) : isBookmarked ? (
        <img src={yellowStar} alt="Bookmarked" className={styles.starImg} />
      ) : (
        <img src={blackStar} alt="Not bookmarked" className={styles.starImg} />
      )}
    </div>
  );
};

const Flashcard = ({ currentWord, setCurrentWord }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const storedId = sessionStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;

  const toggleCard = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleBookmark = async (e) => {
    e.stopPropagation();
    try {
      let updatedIsBookmarked = !currentWord.isBookmarked;
      if (currentWord.isBookmarked) {
        await deleteWordsByUser(userId, currentWord.wordName);
        console.log("북마크에서 해제: ", currentWord);
      } else {
        await addWordsByUser(userId, currentWord.wordName);
        console.log("북마크에 추가: ", currentWord);
      }
      setCurrentWord((prevWord) => ({ ...prevWord, isBookmarked: updatedIsBookmarked }));
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const shakeAnimation = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className={`${styles.container} ${isFlipped}`}
      onClick={toggleCard}
      variants={shakeAnimation}
      animate="shake"
    >
      {/* 카드 내용 */}
      <div className={styles.flexJustifyBetween}>
        <BookmarkButton isBookmarked={currentWord.isBookmarked} toggleBookmark={toggleBookmark} />
      </div>
      {isFlipped ? (
        <div className={styles.wordName}>해당 영상의 수어 뜻 : {currentWord.wordName}</div>
      ) : (
        <video loop autoPlay muted key={currentWord.videoUrl} className={styles.video}>
          <source src={currentWord.videoUrl} type="video/mp4" />
        </video>
      )}
    </motion.div>
  );
};

export default Flashcard;
