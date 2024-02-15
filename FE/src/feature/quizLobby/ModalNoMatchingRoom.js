import React from "react";
import AlertModal from "../../components/common/Modal/AlertModal";
import styles from "../../components/common/Modal/AlertModal";

const ModalNoMatchingRoom = ({ onClose }) => (
  <AlertModal onClose={onClose} className={styles.noMatchingRoom}>
    <p>일치하는 방이 존재하지 않습니다</p>
  </AlertModal>
);

export default ModalNoMatchingRoom;
