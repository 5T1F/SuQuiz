import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import styles from "./MainPage.module.css";
import backgroundVideo from "../assets/backgroundVideo.mp4";
import { motion } from "framer-motion";
import ModalLogin from "../feature/auth/login/ModalLogin";
import EasterEgg from "../assets/baseball.png";

export default function MainPage() {
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  const navigate = useNavigate();
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 함수를 전달하여 모달 닫기
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleQuizStart = () => {
    if (userId !== 0) {
      navigate("/quizLobby");
    } else {
      setModalOpen(true);
    }
  };

  const handleLearningStart = () => {
    if (userId !== 0) {
      navigate("/learning");
    } else {
      setModalOpen(true);
    }
  };

  function redirectToLink() {
    window.location.href = "https://youtu.be/qglXwoWpC3o?feature=shared";
  }

  return (
    <>
      <Container>
        <img src={EasterEgg} width={20} onClick={redirectToLink} className={styles.easterEgg} />
        <div className={styles.container}>
          <div className={styles.startbuttons}>
            <button className={styles.quizStart} onClick={handleQuizStart}>
              퀴즈 시작
            </button>
            <button className={styles.learningStart} onClick={handleLearningStart}>
              학습 시작
            </button>
          </div>
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.4 }} // 자식 컴포넌트들이 0.2초 간격으로 나타남
            >
            <motion.div transition={{ staggerChildren: 0.4 }}>수퀴즈 소개 1</motion.div>
            <motion.div transition={{ staggerChildren: 0.8 }}>수퀴즈 소개 2</motion.div>
            <motion.div transition={{ staggerChildren: 0.4 }}>수퀴즈 소개 3</motion.div>
          </motion.div> */}
        </div>
      </Container>

      {/* modalOpen이 true일 때만 모달 렌더링 */}
      {modalOpen && <ModalLogin onClose={handleCloseModal} />}
      <div className={styles.videoContainer}>
        <video className={styles.video} autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>
    </>
  );
}
