import React, { useRef, useState, useEffect } from "react";

import ModalNoMatchingUser from "./ModalNoMatchingUser";

import styles from "./ModalMakeFriend.module.css";

const ModalEndFriendship = ({ onClose, friendNickname }) => {
  // 로그인 완성 되면 채우기 *************************
  const userId = null; // 친구 요청 목록을 위해
  const modalRef = useRef();

  const handleClickInside = (event) => {
    event.stopPropagation();
  };

  const handleEndFriendship = async () => {
    try {
      const requestBody = {
        fromNickname: userId,
        toNickname: friendNickname,
      };

      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();

      if (data.status === "ok") {
        console.log(`친구 관계가 성공적으로 삭제되었습니다.`);
        // 여기에 성공 처리에 대한 로직을 추가하세요.
      } else {
        console.error("친구 관계 삭제 오류:", data.message);
        // 여기에 실패 처리에 대한 로직을 추가하세요.
      }
    } catch (error) {
      console.error("친구 관계 삭제 중 오류 발생:", error);
      // 여기에 오류 처리에 대한 로직을 추가하세요.
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
      <div ref={modalRef} className={styles.modal} onClick={handleClickInside}>
        <div className={styles.modalContent}>
          <p>친구 삭제</p>
          <p>정말 삭제하시겠습니까?</p>
          <div>
            <button className={styles.close} onClick={onClose}>
              아니오
            </button>
            <button onClick={handleEndFriendship}>예</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEndFriendship;
