import React, { useState } from "react";

import ModalMakeFriend from "./makeFriend/ModalMakeFriend";

import styles from "./Slidebar.module.css"; // 스타일 파일을 import

const Slidebar = ({ onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 함수를 전달하여 클릭 시 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseSlidebar = () => {
    onClose(); // 버튼 클릭 시 사이드바 닫기
  };

  return (
    <>
      <div className={styles.slidebar}>
        <button className={styles.close} onClick={handleCloseSlidebar}>
          〈
        </button>
        <div>유저 정보</div>
        {/* 함수로 친구목록 / 채팅 번갈아 나오도록 처리 */}
        <div>
          <p>친구</p>
          <button onClick={openModal}>친구추가</button>
          <input type="text" placeholder="친구 닉네임"></input>
          <button>검색</button>
        </div>
        <div>채팅</div>
      </div>
      {isModalOpen && <ModalMakeFriend onClose={closeModal} />} {/* 모달이 열려 있을 때만 렌더링 */}
    </>
  );
};

export default Slidebar;
