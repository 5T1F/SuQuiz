import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import styles from "./MainPage.module.css";
import backgroundVideo from "../assets/backgroundVideo.mp4";
import { motion } from "framer-motion";

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
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    </>
  );
}
