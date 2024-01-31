import React, { useRef, useEffect } from "react";
import styles from "./ModalLogin.module.css";
import Naver from "../feature/login/NaverLogin";
import Kakao from "../feature/login/KakaoLogin";

const Modal = ({ onClose }) => {
  const modalRef = useRef();

  const handleClickInside = (event) => {
    // 모달 내부를 클릭한 경우 이벤트 전파를 중지시킴
    event.stopPropagation();
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
    <div ref={modalRef} className={styles.modal} onClick={handleClickInside}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <Naver />
        <Kakao />
      </div>
    </div>
  );
};

export default Modal;
