import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import styles from "./MainPage.module.css";
import backgroundVideo from "../assets/backgroundVideo.mp4";
import ModalLogin from "../feature/auth/login/ModalLogin";
import EasterEgg from "../assets/baseball.png";

export default function MainPage() {
  const storedId = sessionStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

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
      <img src={EasterEgg} width={20} onClick={redirectToLink} className={styles.easterEgg} />

      <Container>
        <div className={styles.container}>
          <div className={styles.startbuttons}>
            <button className={styles.quizStart} onClick={handleQuizStart}>
              퀴즈 시작
            </button>
            <button className={styles.learningStart} onClick={handleLearningStart}>
              학습 시작
            </button>
          </div>

          <div className={styles.descriptionContainer}>
            <div className={styles.description1}>Easy Peasy,</div>
            <div className={styles.description1}>Lemon SuQuiz !</div>
            <div className={styles.description2}>SuQuiz와 함께라면</div>
            <div className={styles.description2}>수어 학습도</div>
            <div className={styles.description2}>식은 죽 먹기</div>
          </div>
        </div>
      </Container>

      {modalOpen && <ModalLogin onClose={handleCloseModal} />}

      <div className={styles.videoContainer}>
        <video className={styles.video} autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>
    </>
  );
}
