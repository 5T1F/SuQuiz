import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { useAuthStore, useUserNicknameStore, useProviderStore, useTokenStore } from "../app/store";
import Logo from "../assets/logoShort.png";
import Slidebar from "../feature/mypage/Slidebar";
import ModalLogin from "../feature/auth/login/ModalLogin";

import styles from "./Nav.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Nav() {
  const { userId, setUserId } = useAuthStore();
  const { userNickname, setUserNickname } = useUserNicknameStore();
  const { provider, setProvider } = useProviderStore();
  const { accessToken, setAccessToken } = useTokenStore();
  const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = sessionStorage.getItem("idStorage");
    const storedNickname = sessionStorage.getItem("nicknameStorage");
    const storedProvider = sessionStorage.getItem("providerStorage");
    const storedToken = sessionStorage.getItem("tokenStorage");
    try {
      const parsedId = JSON.parse(storedId);
      const parsedNickname = JSON.parse(storedNickname);
      const parsedProvider = JSON.parse(storedProvider);
      const parsedToken = JSON.parse(storedToken);
      setUserId(parsedId.state.userId);
      setUserNickname(parsedNickname.state.userNickname);
      setProvider(parsedProvider.state.provider);
      setAccessToken(parsedToken.state.accessToken);
    } catch (error) {
      console.error("Error parsing stored data:", error);
    }
  }, []);

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

  const selectedMain = "단어장";
  const selectedSub = "";
  const handleLearningBookmark = () => {
    if (userId !== 0) {
      navigate("/learning/start", { state: { selectedMain, selectedSub } });
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <nav className={styles.navContainer}>
        <div>
          <div className={styles.navLogo}>
            <NavLink to="/">
              <img src={Logo} alt="logo" width={120} />
            </NavLink>
          </div>
          <div className={styles.navItem}>
            <div>
              <button onClick={handleLearningBookmark}>단어장</button>
            </div>
            <div className={styles.userInfoContainer}>
              {userNickname === null ? (
                <div>
                  <button className={styles.fontSize} onClick={handleLoginClick}>
                    로그인
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.accountCircleIcon}>
                    <AccountCircleIcon onClick={toggleSlidebar} />
                  </div>
                  {isSlidebarOpen && <div className={styles.overlay} onClick={toggleSlidebar} />}
                  <AnimatePresence>
                    {isSlidebarOpen && <Slidebar onClose={closeSlidebar} isSlidebarOpen={isSlidebarOpen} />}
                  </AnimatePresence>
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
