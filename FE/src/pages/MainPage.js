import { Navigate } from "react-router-dom";

import Container from "../components/Container";

import styles from "./MainPage.module.css";

import backgroundVideo from "../assets/backgroundVideo.mp4";

export default function MainPage() {
  return (
    <>
      <Container>
        <div className={styles.container}>
          <div className={styles.startbuttons}>
            <button className={styles.quizStart} onClick={() => <Navigate to="/quizLobby" />}>
              퀴즈 시작
            </button>
            <button className={styles.learningStart} onClick={() => <Navigate to="/learning" />}>
              학습 시작
            </button>
          </div>
        </div>
      </Container>
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    </>
  );
}
