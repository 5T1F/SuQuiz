import React, { useRef, useEffect } from "react";

import Naver from "./NaverLogin";
import Kakao from "./KakaoLogin";

import styles from "./ModalLogin.module.css";

import naverIcon from "../../../assets/icons/naver-icon.png";
import kakaoIcon from "../../../assets/icons/kakao-icon.png";

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
      <div className={styles.modalTitle}>
        <div>간편 로그인</div>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.naverContainer}>
          <img src={naverIcon} alt="Naver login" />
          <Naver />
        </div>
        <div className={styles.kakaoContainer}>
          <img src={kakaoIcon} alt="Kakao login" />
          <Kakao />
        </div>
      </div>
    </div>
  );
};

export default Modal;
