import Container from "../components/Container";
import Wordle from "../feature/singleplay/Wordle";
import MyCam from "../feature/Learning/MyCam";
import styles from "./SingleplayPage.module.css";
import { useState } from "react";

export default function SingleplayPage() {
  // motion detect value
  const [finger, setFinger] = useState("#");
  const changeFinger = (value) => {
    setFinger(value);
    console.log(value);
  };

  return (
    <>
      <Container>
        <div className={styles.container}>
          <div className={styles.mycam}>
          <MyCam categoryNumber={4} changeFinger={changeFinger} isVideoVisible={true}></MyCam>
          </div>
          <div className={styles.wordle}>
            <Wordle finger={finger}></Wordle>
          </div>
        </div>
      </Container>
    </>
  );
}
