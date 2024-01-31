import { useState, useRef } from "react";

import Nav from "../components/Nav";
import Container from "../components/Container";
import ModalLogin from "../components/ModalLogin"; // 모달 컴포넌트를 import

import styles from "./MainPage.module.css";

export default function MainPage() {
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
      <Container>
        <button onClick={handleLoginClick}>로그인</button>
        <h1>***********메인페이지***********</h1>
        <div className={styles.quizStartBtn}>퀴즈 시작</div>
        <div className={styles.learningStartBtn}>학습 시작</div>
      </Container>

      {/* modalOpen이 true일 때만 모달 렌더링 */}
      {modalOpen && <ModalLogin onClose={handleCloseModal} />}
    </>
  );
}
