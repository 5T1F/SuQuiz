import React from "react";

const StreakIcon = ({ streak }) => {
  // streak의 solved 값을 기반으로 아이콘 또는 스타일을 결정합니다.
  let icon;
  if (streak.solved === -1) {
    icon = <img src="wrong-icon.png" alt="틀림" />;
  } else if (streak.solved === 0) {
    icon = <img src="not-solved-icon.png" alt="안푼거" />;
  } else if (streak.solved === 1) {
    icon = <img src="correct-icon.png" alt="정답" />;
  } else {
    icon = null;
  }

  return <div>{icon}</div>;
};

export default StreakIcon;
