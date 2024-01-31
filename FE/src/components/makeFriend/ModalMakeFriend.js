import React, { useRef, useEffect } from "react";
import styles from "./ModalMakeFriend.module.css";

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
        <div>친구 추가</div>
        <div>
          <input type="text" placeholder="유저 닉네임"></input>
        </div>
        <div>
          <button className={styles.close} onClick={onClose}>
            취소
          </button>
          <button>요청</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
