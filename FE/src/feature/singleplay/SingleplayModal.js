import React, { useEffect, useState } from "react";
import RecordItem from "./RecordItem";
import styles from "./SingleplayModal.module.css";
import StreakDisplay from "./StreakDisplay";
import { dailyResult } from "../../apis/singleplayApi";
import TrialSpread from "./TrialSpread";

const SingleplayModal = ({ result, onClose }) => {
  const [streakData, setStreakData] = useState(null);

  //나중에 그냥 api에서 받아온 값으로 고쳐
  const trialSpreadData = [0, 3, 49, 79, 40, 17];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dailyResult();
        setStreakData(result.data.streak);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={styles.modal}>
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
                <StreakDisplay streakData={streakData} />
              </div>
            </div>
          </div>
          <div>
            <button>더 풀어보기</button>
            <button>공유하기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleplayModal;
