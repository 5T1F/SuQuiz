// SingleplayModal.js 파일

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import { end } from "../../apis/multiplayApi";

import styles from "./MultiplayModal.module.css";
import "react-calendar/dist/Calendar.css";
import congratulation from "../../assets/lottie/congratulation.json";

const MultiplayModal = ({ sessionId, myScore, onClose }) => {
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  // const [solved, setSolved] = useState(true);
  // const [completedDates, setCompletedDates] = useState([]);
  // const [incorrectDates, setIncorrectDates] = useState([]);
  const navigate = useNavigate();
  // const { modalResult } = useWordleStore();
  // const [wordInfo, setWordInfo] = useState(null); // 원하는 단어 정보를 저장할 상태
  const [quizResultList, setQuizResultList] = useState([]);

  // console.log("모달에서 받는 게임 결과:", modalResult);

  useEffect(() => {
    const endGame = async () => {
      // BE에 결과 종료 요청
      const result = await end(sessionId, userId, myScore);
      // 결과가 제대로 반환 되었다면
      if (result.data) {
        setQuizResultList(result.data); //세팅하자
      }
    };

    endGame();

    // const completed = [];
    // const incorrect = [];
    // for (const date in modalResult.streak) {
    //   if (modalResult.streak.hasOwnProperty(date)) {
    //     const value = modalResult.streak[date];
    //     if (value === 1) {
    //       completed.push(date);
    //     } else if (value === -1) {
    //       incorrect.push(date);
    //     }
    //   }
    // }

    // setCompletedDates(completed);
    // setIncorrectDates(incorrect);

    // console.log("completedDates", completedDates, ", incorrectDates", incorrectDates);
  }, []);

  const handleExit = () => {
    onClose();
    navigate("/quizlobby");
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <Lottie
          options={{
            loop: false,
            autoplay: true,
            animationData: congratulation,
            rendererSettings: {
              preserveAspectRatio: "xMidslice", // 종횡비 유지 설정
            },
          }}
        />
        <div className={styles.modalContent}>
          <div className={styles.modalTitle}>
            멀티 플레이 결과
            <button className={styles.close} onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="flex row">
            <div className={styles.wordContent}></div>
          </div>
          <div className={styles.btns}>
            <button onClick={onClose} className={styles.moreQuizBtn}>
              다시하기
            </button>
            <button onClick={handleExit} className={styles.moreQuizBtn}>
              나가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiplayModal;
