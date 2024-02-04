import React from "react";
import styles from "./Streak.module.css";

const Streak = ({ streakData }) => {
  if (!streakData) {
    return null;
  }

  return (
    <div className={styles.streakContainer}>
      {streakData.map((item, index) => (
        <div key={index} className={styles.streakRow}>
          {item.map((answer, i) => (
            <div
              key={i}
              className={`${styles.streakItem} ${
                answer === 1 ? styles.correct : answer === -1 ? styles.incorrect : styles.notSolved
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Streak;
