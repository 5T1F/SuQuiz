import React from "react";
import styles from "./RecordItem.module.css";

const RecordItem = ({ label, value, color }) => {
  const colorClass = styles[color];

  return (
    <>
      <div className={`${styles["container"]} ${colorClass}`}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
      </div>
    </>
  );
};

export default RecordItem;
