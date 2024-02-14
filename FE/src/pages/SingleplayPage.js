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
              <div>워들에 대한 설명</div>
              <div>문제 규칙 설명 등등등</div>
              <div>예시 등등등</div>
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
