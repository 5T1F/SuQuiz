import React, { useRef, useState, useEffect } from "react";

import { endFriendship } from "../../../../apis/mypageApi";

import styles from "./ModalEndFriendship.module.css";

const ModalEndFriendship = ({ onClose, friendNickname }) => {
  const storedNickname = sessionStorage.getItem("nicknameStorage");
  const parsedNickname = JSON.parse(storedNickname);
  const userNickname = parsedNickname.state.userNickname;
  const modalRef = useRef();

  const handleClickInside = (event) => {
    event.stopPropagation();
  };

  const handleEndFriendship = async () => {
    try {
      const data = await endFriendship(userNickname, friendNickname);
      if (data.status === 200) {
        alert(`친구 관계가 성공적으로 삭제되었습니다.`);
      } else {
        console.error("친구 관계 삭제 오류:", data.message);
      }
    } catch (error) {
      console.error("친구 관계 삭제 중 오류 발생:", error);
    }

    onClose(); // 처리가 완료되면 모달을 닫습니다.
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      <div className={styles.modalBackground}>
        <div ref={modalRef} className={styles.modal} onClick={handleClickInside}>
          <div className={styles.modalContent}>
            <p className={styles.title}>친구 삭제</p>
            <p>정말 삭제하시겠습니까?</p>
            <div className={styles.btns}>
              <button className={styles.yesButton} onClick={handleEndFriendship}>
                예
              </button>
              <button className={styles.noButton} onClick={onClose}>
                아니오
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEndFriendship;
