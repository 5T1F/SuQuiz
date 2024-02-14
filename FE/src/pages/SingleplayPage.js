import Container from "../components/Container";
import Wordle from "../feature/singleplay/Wordle";
import MyCam from "../feature/Learning/MyCam";
import styles from "./SingleplayPage.module.css";
import { useState } from "react";
import { style } from "@mui/system";

export default function SingleplayPage() {
  // motion detect value
  const [finger, setFinger] = useState("");
  const changeFinger = (value) => {
    setFinger(value);
    console.log(value);
  };

  return (
    <>
      <Container>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <div className={styles.mycam}>
              <div className={styles.video}>
                <MyCam categoryNumber={4} changeFinger={changeFinger} isVideoVisible={true}></MyCam>
              </div>
            </div>
            <div className={styles.tutorial}>
              <div className={styles.ruleTitle}>싱글 플레이 규칙</div>
              <div className={styles.rule}>5개의 한글 자모로 이루어진 글자를 6번 안에 맞히는 게임입니다!</div>
              <div className={styles.rule}>수어로 한글 자모를 입력한 뒤 엔터를 눌러보세요.</div>
              <div className={styles.rule}>
                자모가 올바른 자리에 있다면 칸이 <span className={styles.highlight}>초록색</span>으로 변합니다.
              </div>
              <div className={styles.rule}>
                자모가 잘못된 자리에 있다면 칸이 <span className={styles.yellowHighlight}>노란색</span>으로 변합니다.
              </div>
              <div className={styles.rule}>오늘의 문제는 매일 새벽 6시에 바뀌며, 스트릭의 기한도 마찬가지입니다.</div>
              <div className={styles.boldHighlight}>
                매일 매일 문제를 풀며 수어로 자음,모음을 마스터하고, 새로운 단어를 수어로 배워봅시다.
              </div>
            </div>
          </div>
          <div className={styles.wordle}>
            <Wordle finger={finger}></Wordle>
          </div>
        </div>
      </Container>
    </>
  );
}
