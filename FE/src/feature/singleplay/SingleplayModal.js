import React, { useEffect, useState } from "react";
import RecordItem from "./RecordItem";
import styles from "./SingleplayModal.module.css";
import Streak from "./Streak";
// import { dailycorrect } from "../../apis/singleplayApi";
import TrialSpread from "./TrialSpread";
import { dailyResult } from "../../apis/singleplayApi";

const SingleplayModal = ({ result, onClose }) => {
  const [streakData, setStreakData] = useState(null);
  const [quizcorrect, setQuizCorrect] = useState({
    allTrialCount: 0, // 전체 도전 횟수
    streak: {}, // 스트릭
    solveCount: 0, // 최근 연속 스트릭
    correctCount: 0, // 최근 연속 정답
    maxCorrectCount: 0, // 최장 연속 스트릭 (맞은 거 틀린 거 다 포함)
    trialSpread: [0, 0, 0, 0, 0], // 도전 분포
    correctRate: 0, // 정답율
  });

  const dummyStreakData = [
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, -1],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [-1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 0, 1, 1, 1, -1, 1, -1],
    [-1, 1, 0, 1, -1, -1, -1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 1, 1, -1, 1, 1],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
  ];

  console.log("true???????????", result);

  useEffect(() => {
    setStreakData(dummyStreakData);
    const fetchData = async () => {
      try {
        const data = await dailyResult("asd@naver.com"); // 유저 이메일 수정 필요
        setQuizCorrect(data); // API에서 가져온 데이터로 quizcorrect 상태 업데이트
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const copyDummyDataToClipboard = () => {
    const { correct, trialCount, correctCount, resultText } = result;

    let correctString = correct ? "성공" : "실패";
    correctString += ` ${trialCount}/6 ${correctCount}\n`;

    // 5개씩 나누어서 줄바꿈을 하기 위한 함수
    const chunkString = (str, size) => {
      const chunkedArr = [];
      for (let i = 0; i < str.length; i += size) {
        chunkedArr.push(str.slice(i, i + size));
      }
      return chunkedArr;
    };

    const textChunks = chunkString(resultText, 5);
    correctString += textChunks.join("\n");

    navigator.clipboard
      .writeText(correctString)
      .then(() => {
        console.log("복사 성공: ", correctString);
      })
      .catch((error) => {
        console.error("복사 실패: ", error);
      });
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className="flex row justify-between">
            <div className="modal-title">싱글 플레이 결과</div>
            <button onClick={onClose}>닫기</button>
          </div>
          <div className="modal-content">
            <div className="flex justify-center">
              {result.correct ? (
                <p>축하합니다! 정답을 맞추셨습니다!</p>
              ) : (
                <p>아쉽지만 게임 오버입니다. 정답을 맞추지 못했습니다.</p>
              )}
            </div>
            <div className="flex row">
              <RecordItem label="전체도전" value={quizcorrect.allTrialCount} color="green" />
              <RecordItem label="정답률" value={`${quizcorrect.correctRate}%`} color="blue" />
              <RecordItem label={"최근 연속 정답 기록"} value={quizcorrect.correctCount} color="yellow" />
              <RecordItem label={"최장 연속 스트릭"} value={quizcorrect.maxCorrectCount} color="red" />
            </div>
            <div className="flex row">
              <div className={styles.trialContainer}>
                <div>도전분포</div>
                <div>
                  <TrialSpread trialSpreadData={quizcorrect.trialSpread} />
                </div>
              </div>
              <div className={styles.streakContainer}>
                <div>오늘의 단어 스트릭</div>
                <div>
                  <Streak streakData={streakData} />
                </div>
                <div>연속 {quizcorrect.solveCount}일 달성중이에요!</div>
              </div>
            </div>
            <div className="float-right mt-3">
              <button className="mr-2">더 풀어보기</button>
              <button onClick={copyDummyDataToClipboard}>복사하기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleplayModal;
