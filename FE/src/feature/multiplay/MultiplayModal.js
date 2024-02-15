// SingleplayModal.js 파일

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import { motion } from "framer-motion";
import "react-circular-progressbar/dist/styles.css"; // 스타일 시트 임포트
import { end } from "../../apis/multiplayApi";

import styles from "./MultiplayModal.module.css";
import goldMedal from "../../assets/icons/gold-medal.png"; // 금메달 이미지 경로
import silverMedal from "../../assets/icons/silver-medal.png"; // 은메달 이미지 경로
import bronzeMedal from "../../assets/icons/bronze-medal.png"; // 동메달 이미지 경로
import flag from "../../assets/images/flag.png";
import congratulation from "../../assets/lottie/congratulation.json";

const MultiplayModal = ({ playersList, sessionId, myScore, onClose, solver, quizVideo, quizWord }) => {
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  const storedNickname = localStorage.getItem("nicknameStorage");
  const parsedNickname = JSON.parse(storedNickname);
  const userNickname = parsedNickname.state.userNickname;
  const navigate = useNavigate();
  const [quizResult, setQuizResult] = useState({});
  console.log(quizWord);
  console.log(quizVideo);

  useEffect(() => {
    const endGame = async () => {
      // BE에 결과 종료 요청
      const result = await end(sessionId, userId, myScore);
      console.log("멀티플레이 결과");
      console.log(result);
      console.log(playersList);
      // 결과가 제대로 반환 되었다면
      if (result.data) {
        setQuizResult(result.data); //세팅하자
      }
    };

    endGame();
  }, [playersList]);

  const handleExit = () => {
    onClose();
    navigate("/quizlobby");
  };

  const LinearProgressbar = ({ level, exp }) => {
    const maxExp = (level - 1) * 50 + 100;
    const percentage = Math.min(100, (exp / maxExp) * 100); // 현재 경험치를 퍼센트로 변환, 최대 100%

    return (
      <div className="w-full h-4 bg-[#e8ebed] rounded-full">
        <div className="h-4 rounded-full bg-coutom-yellow" style={{ width: `${percentage}%` }}></div>
      </div>
    );
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
            <div className={styles.wordContent}>
              {userNickname === solver ? <p>축하합니다! 정답입니다!</p> : <p>퀴즈가 종료되었습니다.</p>}
              {quizVideo ? (
                <>
                  <p>
                    정답 단어는 <span className={styles.highlight}>"{quizWord}"</span> 입니다.
                  </p>
                  <p>수어로는 어떤 동작인지 알아볼까요?</p>
                  <div className={styles.video}>
                    <video loop autoPlay muted>
                      <source src={quizVideo} type="video/mp4" />
                      영상이 존재하지 않습니다.
                    </video>
                  </div>
                </>
              ) : (
                <p>로딩 중...</p>
              )}
            </div>
            <div className={styles.resultContent}>
              {quizResult ? (
                <>
                  {/* 사용자 정보 표시 부분 */}
                  <div className={styles.userInfo}>
                    <div className="relative w-20 h-24">
                      <img src={flag} alt="Flag" className="absolute inset-0 z-10 w-full h-full py-2" />
                      <div className="absolute inset-0 z-20 flex items-center justify-center pb-3">
                        <div className="font-bold text-2xl text-[#97ce9b]">Lv.{quizResult.level}</div>
                      </div>
                    </div>
                    <div className="w-64 ml-3">
                      <div className="w-full mb-1 text-2xl font-bold">{userNickname}</div>
                      <div className="text-gray-500">EXP.{quizResult.exp}</div>
                      <div className={styles.progressBar}>
                        <LinearProgressbar level={quizResult.level} exp={quizResult.exp} />
                      </div>
                    </div>
                  </div>
                  <table className={styles.table}>
                    <thead className={styles.tableHeader}>
                      <tr>
                        <th className="w-[70px]">순위</th>
                        <th>닉네임</th>
                        <th>레벨</th>
                        <th className="w-[70px]">경험치</th>
                      </tr>
                    </thead>
                    <tbody>
                      {playersList.map((user, index) => (
                        <motion.tr
                          key={user.playerNickname}
                          className={`${user.nickname === userNickname ? styles.highlight : ""} ${styles.tableRow}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <td className="flex items-center justify-center">
                            {index === 0 ? (
                              <img src={goldMedal} alt="Gold Medal" />
                            ) : index === 1 ? (
                              <img src={silverMedal} alt="Silver Medal" />
                            ) : index === 2 ? (
                              <img src={bronzeMedal} alt="Bronze Medal" />
                            ) : (
                              4
                            )}
                          </td>
                          <td>
                            {user.playerNickname}
                            {user.playerNickname === userNickname && <span className={styles.myIcon}> 🍋</span>}
                          </td>
                          <td>{user.playerNickname === userNickname ? quizResult.level : 1}</td>
                          <td>
                            {user.playerNickname === userNickname ? quizResult.exp : Math.floor(Math.random() * 100)}
                            {/* 플레이어들의 정보를 못 받아와서 난수로 지정해둠 */}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <p>로딩 중...</p>
              )}
            </div>
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
