import React, { useEffect, useState } from "react";
import RecordItem from "./RecordItem";
import styles from "./SingleplayModal.module.css";
import Streak from "./Streak";
// import { dailyResult } from "../../apis/singleplayApi";
import TrialSpread from "./TrialSpread";

const SingleplayModal = ({ result, onClose }) => {
  const [streakData, setStreakData] = useState(null);

  //더미데이터~~ 나중에 api에서 받아온 값으로 고쳐야 함
  const trialSpreadData = [0, 3, 49, 79, 40, 17];
  // const dummyStreakData = [
  //   ["2024.02.01", 0],
  //   ["2024.02.02", 1],
  //   ["2024.02.03", -1],
  // ];
  const dummyStreakData = [
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, -1],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [-1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 0, 1, 1, 1, -1, 1, -1],
    [-1, 1, 0, 1, -1, -1, -1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 1, 1, -1, 1, 1],
    [0, 1, 1, 0, 1, , 1, 1, 1, 1, 1, 0],
  ];
  const dummyCopyData = [false, 4, 188, "ㅇㅇㅇㅁㅁㅁㅁㅇㅇㅇㅇㅇㅇㅇㅇㅁㅁㅁㅁㅁ"];

  useEffect(() => {
    setStreakData(dummyStreakData);
  }, []);

  const copyDummyDataToClipboard = () => {
    const [correct, trialCount, correctCount, resultText] = dummyCopyData;

    let resultString = correct ? "실패" : "성공";
    resultString += ` ${trialCount}/6 ${correctCount}\n`;

    // 5개씩 나누어서 줄바꿈을 하기 위한 함수
    const chunkString = (str, size) => {
      const chunkedArr = [];
      for (let i = 0; i < str.length; i += size) {
        chunkedArr.push(str.slice(i, i + size));
      }
      return chunkedArr;
    };

    const textChunks = chunkString(resultText, 5);
    resultString += textChunks.join("\n");

    navigator.clipboard
      .writeText(resultString)
      .then(() => {
        console.log("복사 성공: ", resultString);
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
              {result === "win" && <p>축하합니다! 정답을 맞추셨습니다!</p>}
              {result === "lose" && <p>아쉽지만 게임 오버입니다. 정답을 맞추지 못했습니다.</p>}
            </div>
            <div className="flex row">
              <RecordItem label="전체도전" value={188} color="green" />
              <RecordItem label="정답률" value={`100%`} color="blue" />
              <RecordItem label={"최근 연속\n정답 기록"} value={188} color="yellow" />
              <RecordItem label={"최다 연속\n정답 기록"} value={188} color="red" />
            </div>
            <div className="flex row">
              <div className={styles.trialContainer}>
                <div>도전분포</div>
                <div>
                  <TrialSpread trialSpreadData={trialSpreadData} />
                </div>
              </div>
              <div className={styles.streakContainer}>
                <div>오늘의 단어 스트릭</div>
                <div>
                  <Streak streakData={streakData} />
                </div>
                <div>연속 NN일 달성중이에요!</div>
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
