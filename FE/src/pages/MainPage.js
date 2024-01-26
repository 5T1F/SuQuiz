import { useState } from "react";
import Container from "../components/Container";
import ModalLogin from "../components/login/ModalLogin";

export default function MainPage() {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div>
        <button onClick={showModal}>로그인</button>
        {modalOpen && <ModalLogin setModalOpen={setModalOpen} />}
      </div>
      <Container>
        <h1>***********메인페이지***********</h1>
        <div className="start-quiz">퀴즈 시작</div>
        <div className="start-learn">학습 시작</div>
      </Container>
    </>
  );
}
