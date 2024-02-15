import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Container from "../components/Container";
import Wordle from "../feature/singleplay/Wordle";
import MyCam from "../feature/Learning/MyCam";
import styles from "./SingleplayPage.module.css";

import tutorialYellow from "../assets/images/tutorial_yellow.png";
import tutorialGreen from "../assets/images/tutorial_green.png";
import tutorialCorrect from "../assets/images/tutorial_correct.png";

export default function SingleplayPage() {
  // motion detect value
  const [finger, setFinger] = useState("");
  const changeFinger = (value) => {
    setFinger(value);
    console.log(value);
  };

  const settings = {
    dots: true,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
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
              <div className={styles.ruleTitle}>-&nbsp; 싱글 플레이 규칙 &nbsp;-</div>
              <div className={styles.rule1}>
                <p className={styles.rule1}>5개의 한글 자모로 이루어진 글자를 6번 안에 맞히는 게임입니다.</p>
              </div>
              <div className={styles.ruleContents}>
                <Slider {...settings}>
                  <div key="slide2" className={styles.rule}>
                    수어로 한글 자모를 입력한 뒤 엔터를 눌러보세요.
                  </div>
                  <div key="slide3" className={styles.rule}>
                    자모가 올바른 자리에 있다면 칸이 <span className={styles.highlight}>초록색</span>으로 변합니다.
                    <div className={styles.ruleImageContainer}>
                      <img src={tutorialGreen} alt="올바른 자리" />
                    </div>
                  </div>
                  <div key="slide4" className={styles.rule}>
                    자모가 잘못된 자리에 있다면 칸이 <span className={styles.yellowHighlight}>노란색</span>으로
                    변합니다.
                    <div className={styles.ruleImageContainer}>
                      <img src={tutorialYellow} alt="잘못된 자리" />
                    </div>
                  </div>
                  <div key="slide5" className={styles.rule}>
                    자모가 모두 올바른 자리에 있다면 정답입니다.
                    <div className={styles.ruleImageContainer}>
                      <img src={tutorialCorrect} alt="정답" />
                    </div>
                  </div>
                  <div key="slide9" className={styles.boldHighlight}>
                    <div className={styles.boldHighlight}>매일 매일 문제를 풀며 수어로 자음,모음을 마스터하고,</div>
                    <div className={styles.boldHighlight}> 새로운 단어를 수어로 배워봅시다.</div>
                  </div>
                  <div key="slide6" className={styles.rule}>
                    <div className={styles.rule}>사전에 있는 단어만 입력 가능합니다.</div>
                  </div>
                  <div key="slide7" className={styles.rule}>
                    <div className={styles.rule}>오늘의 문제는 매일 새벽 6시에 갱신됩니다.</div>
                  </div>
                  <div key="slide7" className={styles.rule}>
                    <div className={styles.rule}>스트릭의 기준 시는 새벽 6시입니다.</div>
                  </div>
                </Slider>
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

//제발
