import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import FriendList from "./FriendList";
import WaitingFriendList from "./WaitingFriendList";

import styles from "./Tab.module.css";

function CustomTab({ selectedMain }) {
  const [activeTab, setActiveTab] = useState("FriendList");

  useEffect(() => {
    if (selectedMain) {
      setActiveTab(selectedMain);
    }
  }, [selectedMain]);

  const handleTabClick = (category) => {
    setActiveTab(category);
  };

  const tabVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div>
        <div className={styles.tabTitle}>
          <button
            className={activeTab === "FriendList" ? styles.activeTab : styles.inactiveTab}
            onClick={() => handleTabClick("FriendList")}
          >
            친구 목록
          </button>
          <button
            className={activeTab === "WaitingFriendList" ? styles.activeTab : styles.inactiveTab}
            onClick={() => handleTabClick("WaitingFriendList")}
          >
            친구 요청
          </button>
        </div>
        <motion.div
          className={styles.tabContentContainer}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {activeTab === "FriendList" && <FriendList isMultiplay={false} />}
          {activeTab === "WaitingFriendList" && <WaitingFriendList />}
          {/* 채팅 탭으로 바꿀 때 최근 채팅했던 친구를 넘겨줘야 됨 */}
        </motion.div>
      </div>
    </>
  );
}

export default CustomTab;
