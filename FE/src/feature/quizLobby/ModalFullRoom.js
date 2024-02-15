import React from "react";
import AlertModal from "../../components/common/Modal/AlertModal";
import styles from "../../components/common/Modal/AlertModal";

const ModalFullRoom = ({ onClose }) => (
  <AlertModal onClose={onClose} className={styles.fullRoom}>
    <p>가득찬 방입니다.</p>
    <p>입장이 불가합니다.</p>
  </AlertModal>
);

export default ModalFullRoom;
