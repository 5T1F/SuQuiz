import React, { useEffect, useState } from "react";
import StreakIcon from "./StreakIcon";

const StreakDisplay = ({ streakData }) => {
  const [streakList, setStreakList] = useState([]);

  useEffect(() => {
    if (streakData) {
      const list = Object.entries(streakData).map(([date, solved]) => ({
        date,
        solved,
      }));
      setStreakList(list);
    }
  }, [streakData]);

  // 잔디를 화면에 그립니다.
  return (
    <>
      <div>스트릭 컴포넌트 보임?</div>
      <svg height={18} width={18} overflow="auto">
        {streakList.map((streak, i) => (
          <React.Fragment key={`${streak.date}-fragment`}>
            <StreakIcon streak={streak} />
          </React.Fragment>
        ))}
      </svg>
    </>
  );
};

export default StreakDisplay;
