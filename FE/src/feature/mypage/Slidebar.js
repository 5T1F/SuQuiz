import React from "react";

import UserInfo from "./userInfo/UserInfo";
import Community from "./community/Community";

import styles from "./Slidebar.module.css"; // 스타일 파일을 import

const Slidebar = ({ onClose }) => {
  const handleCloseSlidebar = () => {
    onClose(); // 버튼 클릭 시 사이드바 닫기
  };

  return (
    <>
      <div className={styles.slidebar}>
        <button className={styles.close} onClick={handleCloseSlidebar}>
          〈
        </button>
        <div>
          <p>유저 정보</p>
          <UserInfo />
        </div>
        <div>
          <Community />
        </div>
      </div>
    </>
  );
};

export default Slidebar;
