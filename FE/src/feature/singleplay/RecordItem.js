import React from "react";
import styles from "./RecordItem.module.css";

const RecordItem = ({ label, value, color }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={`record-item ${color}`}>
          <div>{label}</div>
          <div>{value}</div>
        </div>
      </div>
    </>
  );
};

export default RecordItem;
