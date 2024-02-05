import { Link } from "react-router-dom";

import Container from "../components/Container";

import styles from "./MainPage.module.css";

export default function MainPage() {
  return (
    <>
      <Container>
        <div className={styles.quizStart}>
          <Link to="/quizLobby">
            <button>퀴즈 시작</button>
          </Link>
        </div>
        <div className={styles.learningStart}>
          <Link to="/learning">
            <button>학습 시작</button>
          </Link>
        </div>
      </Container>
    </>
  );
}
