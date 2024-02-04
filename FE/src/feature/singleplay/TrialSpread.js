import React, { useEffect, useRef } from "react";
import styles from "./TrialSpread.module.css";

export default function TrialSpread({ trialSpreadData }) {
  const progressRefs = useRef([]);

  useEffect(() => {
    if (progressRefs.current.length > 0) {
      trialSpreadData.forEach((value, index) => {
        progressRefs.current[index].value = value;
      });
    }
  }, [trialSpreadData]);

  if (!trialSpreadData || trialSpreadData.length === 0) {
    return null;
  }

  const maxAttempts = Math.max(...trialSpreadData);

  return (
    <>
      {trialSpreadData.map((value, index) => (
        <div key={index} className={styles.progressContainer}>
          {index + 1}
          <div className={styles.progressLabel}>{value}</div>
          <progress max={maxAttempts} value={value}></progress>
        </div>
      ))}
    </>
  );
}
