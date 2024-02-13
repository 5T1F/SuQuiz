import React from "react";
import { motion } from "framer-motion";

import UserInfo from "./userInfo/UserInfo";
import Community from "./community/Community";

import styles from "./Slidebar.module.css";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const Slidebar = ({ onClose, isSlidebarOpen }) => {
  const handleCloseSlidebar = () => {
    onClose(); // 버튼 클릭 시 사이드바 닫기
  };

  const slideInAnimation = {
    hidden: { x: "100%", opacity: 30 },
    visible: { x: 0, opacity: 1, transition: { type: "inertia", velocity: 125, timeConstant: 80 } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
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
        <div>
          <div className="h-[45vh] border-4 border-orange-600 mb-3">
            <UserInfo />
          </div>
          <div className="h-full">
            <Community />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Slidebar;
