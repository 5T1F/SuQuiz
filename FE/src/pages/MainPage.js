import { useNavigate } from "react-router-dom";

import Container from "../components/Container";

import styles from "./MainPage.module.css";

import backgroundVideo from "../assets/backgroundVideo.mp4";

export default function MainPage() {
  const navigate = useNavigate();

  const handleQuizStart = () => {
    navigate("/quizLobby");
  };

  const handleLearningStart = () => {
    navigate("/learning");
  };

  return (
    <>
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
        </div>
      </Container>
      <video className={styles.video} autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    </>
  );
}
