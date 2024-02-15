import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

import UserInfo from "./userInfo/UserInfo";
import Community from "./community/Community";

import styles from "./Slidebar.module.css";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const Slidebar = ({ onClose, isSlidebarOpen }) => {
  const handleCloseSlidebar = () => {
    onClose(); // 버튼 클릭 시 사이드바 닫기
  };

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

  const slideInAnimation = {
    hidden: { x: "100%", opacity: 30 },
    visible: { x: 0, opacity: 1, transition: { type: "inertia", velocity: 125, timeConstant: 80 } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div ref={modalRef} className={styles.modal} onClick={handleClickInside}>
      <motion.div
        className={styles.slidebar}
        variants={slideInAnimation}
        initial="hidden"
        animate={isSlidebarOpen ? "visible" : "hidden"}
        exit="exit"
      >
        <button className={styles.close} onClick={handleCloseSlidebar}>
          <ArrowForwardIosRoundedIcon />
        </button>
        <div className="h-[90vh] flex flex-col justify-center gap-4">
          <div className="h-[45vh]">
            <UserInfo />
          </div>
          <div className="h-[45vh]">
            <Community />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Slidebar;
