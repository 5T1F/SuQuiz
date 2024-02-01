import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Logo from "../assets/logoShort.png";
import Slidebar from "../feature/mypage/Slidebar";
import styles from "./Nav.module.css";

export default function Nav() {
  const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);

  const toggleSlidebar = () => {
    setIsSlidebarOpen(!isSlidebarOpen);
  };

  const closeSlidebar = () => {
    setIsSlidebarOpen(false);
  };

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navItem}>
        <NavLink to="/">
          <img src={Logo} alt="logo" width={148} height={64.32} />
        </NavLink>
      </div>
      <div className={styles.navItem}>
        <NavLink to="/learning/bookmark">단어장</NavLink>
        <div className={styles.userInfoContainer}>
          <button onClick={toggleSlidebar}>마이페이지</button>
          {isSlidebarOpen && <div className={styles.overlay} onClick={toggleSlidebar} />}
          {isSlidebarOpen && <Slidebar onClose={closeSlidebar} />} {/* 사이드바가 열려 있을 때만 렌더링 */}
        </div>
      </div>
    </nav>
  );
}
