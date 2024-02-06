import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuthStore } from "../app/store";
import Logo from "../assets/logoShort.png";
import Slidebar from "../feature/mypage/Slidebar";
import ModalLogin from "../feature/auth/login/ModalLogin"; // 모달 컴포넌트를 import

import styles from "./Nav.module.css";

export default function Nav() {
  const user = useAuthStore((state) => state.user);
  const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);

  const toggleSlidebar = () => {
    setIsSlidebarOpen(!isSlidebarOpen);
  };

  const closeSlidebar = () => {
    setIsSlidebarOpen(false);
  };

  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 함수를 전달하여 클릭 시 모달 열기
  const handleLoginClick = () => {
    setModalOpen(true);
  };

  // 함수를 전달하여 모달 닫기
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <nav className={styles.navContainer}>
        <div>
          <div className={styles.navLogo}>
            <NavLink to="/">
              <img src={Logo} alt="logo" width={130} />
            </NavLink>
          </div>
          <div className={styles.navItem}>
            <div>
              <NavLink to="/learning/bookmark">단어장</NavLink>
            </div>
            <div className={styles.userInfoContainer}>
              {user == null ? (
                <div>
                  <button onClick={handleLoginClick}>로그인</button>
                </div>
              ) : (
                <>
                  <button onClick={toggleSlidebar}>마이페이지</button>
                  {isSlidebarOpen && <div className={styles.overlay} onClick={toggleSlidebar} />}
                  {isSlidebarOpen && <Slidebar onClose={closeSlidebar} />} {/* 사이드바가 열려 있을 때만 렌더링 */}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* modalOpen이 true일 때만 모달 렌더링 */}
      {modalOpen && <ModalLogin onClose={handleCloseModal} />}
    </>
  );
}
