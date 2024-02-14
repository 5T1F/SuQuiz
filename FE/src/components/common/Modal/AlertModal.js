import React, { useRef, useEffect } from "react";
import styles from "./AlertModal.module.css";

const AlertModal = ({ onClose, children, className }) => {
  const modalRef = useRef();

  const handleClickInside = (event) => {
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
    <div className={styles.modalBackground}>
      <div ref={modalRef} className={styles.modal} onClick={handleClickInside}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default AlertModal;
