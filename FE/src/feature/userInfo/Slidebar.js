import React, { useState } from "react";

import Community from "./community/Community";
import WaitingFriendList from "./community/WaitingFriendList";

import styles from "./Slidebar.module.css"; // 스타일 파일을 import

const Slidebar = ({ onClose }) => {
  const selectedMain = null;

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
        </div>
        {/* 함수로 친구목록 / 채팅 번갈아 나오도록 처리 */}
        <div>
          <Community selectedMain={selectedMain} />
        </div>
      </div>
    </>
  );
};

export default Slidebar;
