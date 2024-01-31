import React, { useState } from "react";

import Slidebar from "./Slidebar";

import styles from "./USerInfo.module.css";

const UserInfo = ({ children }) => {
  const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);

  const toggleSlidebar = () => {
    setIsSlidebarOpen(!isSlidebarOpen);
  };

  const closeSlidebar = () => {
    setIsSlidebarOpen(false);
  };

  return (
    <>
      <div className={styles.userInfoContainer}>
        <button onClick={toggleSlidebar}>마이페이지</button>
        {isSlidebarOpen && <div className={styles.overlay} onClick={toggleSlidebar} />}
        {isSlidebarOpen && <Slidebar onClose={closeSlidebar} />} {/* 사이드바가 열려 있을 때만 렌더링 */}
        <div>{children}</div>
      </div>
    </>
  );
};

export default UserInfo;
