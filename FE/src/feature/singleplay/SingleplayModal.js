// SingleplayModal.js 파일

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import Lottie from "react-lottie";
import moment from "moment";

import RecordItem from "./RecordItem";
import TrialSpread from "./TrialSpread";

import { useWordleStore } from "../../app/store";
import { isSolved } from "../../apis/singleplayApi";
import { allWords } from "../../apis/learningApi";

import styles from "./SingleplayModal.module.css";
import "react-calendar/dist/Calendar.css";
import congratulation from "../../assets/lottie/congratulation.json";

const SingleplayModal = ({ onClose }) => {
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  const [solved, setSolved] = useState(true);
  const [completedDates, setCompletedDates] = useState([]);
  const [incorrectDates, setIncorrectDates] = useState([]);
  const navigate = useNavigate();
  const { modalResult } = useWordleStore();
  const [wordInfo, setWordInfo] = useState(null); // 원하는 단어 정보를 저장할 상태

  console.log("모달에서 받는 게임 결과:", modalResult);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const solved = await isSolved(userId);
        setSolved(solved.data);
        const words = await allWords();
        const targetWord = words.data.find((word) => word.wordName === modalResult.answer);
        console.log("수어 영상을 보여줄 정답 단어정보 ", targetWord);

        if (targetWord) {
          setWordInfo(targetWord);
        } else {
          console.log("원하는 단어 정보가 없습니다.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const completed = [];
    const incorrect = [];
    for (const date in modalResult.streak) {
      if (modalResult.streak.hasOwnProperty(date)) {
        const value = modalResult.streak[date];
        if (value === 1) {
          completed.push(date);
        } else if (value === -1) {
          incorrect.push(date);
        }
      }
    }

    setCompletedDates(completed);
    setIncorrectDates(incorrect);

    console.log("completedDates", completedDates, ", incorrectDates", incorrectDates);
  }, []);

  const copyDummyDataToClipboard = () => {
    let correctString = modalResult.correct ? "성공" : "실패";
    correctString += ` ${modalResult.trialCount}/6 ${modalResult.correctCount}\n`;

    const chunkString = (str, size) => {
      const chunkedArr = [];
      for (let i = 0; i < str.length; i += size) {
        chunkedArr.push(str.slice(i, i + size));
      }
      return chunkedArr;
    };

    const textChunks = chunkString(modalResult.resultText, 5);
    correctString += textChunks.join("\n");

    navigator.clipboard
      .writeText(correctString)
      .then(() => {
        console.log("복사 성공: ", correctString);
      })
      .catch((error) => {
        console.error("복사 실패: ", error);
      });
  };

  const handleMoreQuestion = () => {
    navigate("/singleplay");
    window.location.reload();
  };

  const handleTileContent = ({ date, view }) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const completedDateFound = completedDates.includes(formattedDate);
    const incorrectDateFound = incorrectDates.includes(formattedDate);

    return (
      <div>
        {completedDateFound && (
          <>
            <div className={styles.dotContainer}>
              <div className={styles.dot1}>
                <span className={styles.unicode}>&#10004;</span>
              </div>
            </div>
          </>
        )}
        {incorrectDateFound && (
          <>
            <div className={styles.dotContainer}>
              <div className={styles.dot}>
                <span className={styles.unicode}>&#10060;</span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <Lottie
          options={{
            loop: false,
            autoplay: true,
            animationData: congratulation,
            rendererSettings: {
              preserveAspectRatio: "xMidslice", // 종횡비 유지 설정
            },
          }}
        />
        <div className={styles.modalContent}>
          <div className={styles.modalTitle}>
            싱글 플레이 결과
            <button className={styles.close} onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="flex row">
            <div className={styles.wordContent}>
              {modalResult.correct ? (
                <>
                  <p>축하합니다! 정답을 맞추셨습니다!</p>
                </>
              ) : (
                <p>아쉽지만 정답을 맞추지 못했습니다.</p>
              )}
              {wordInfo ? (
                <>
                  <p>
                    정답 단어는 <span className={styles.highlight}>"{wordInfo.wordName}"</span> 입니다.
                  </p>
                  <p>수어로는 어떤 동작인지 알아볼까요?</p>
                  {/* <div>북마크 여부: {wordInfo.bookmarked}</div> */}
                  <div className={styles.video}>
                    <video loop autoPlay muted>
                      <source src={wordInfo.videoUrl} type="video/mp4" />
                      영상이 존재하지 않습니다.
                    </video>
                  </div>
                </>
              ) : (
                <p>로딩 중...</p>
              )}
            </div>
            <div className={styles.resultContent}>
              <div className="flex">
                <RecordItem label="전체도전" value={modalResult.allTrialCount} color="white" />
                <RecordItem label="정답률" value={`${modalResult.correctRate}%`} color="green" />
                <RecordItem label={"최근 연속 정답 기록"} value={modalResult.correctCount} color="brown" />
                <RecordItem label={"최장 연속 스트릭"} value={modalResult.maxCorrectCount} color="yellow" />
              </div>
              <div className="flex mt-2">
                <div className={styles.trialContainer}>
                  <div className="mb-3 font-bold">도전분포</div>
                  {/* <div className={styles.memo}>*몇 번째 시도에</div>
                  <div className={styles.memo}>맞추셨는지 알아봅시다!</div> */}
                  <div>
                    <TrialSpread trialSpreadData={modalResult.trialSpread} />
                  </div>
                </div>
                <div className={styles.streakContainer}>
                  {/* <div className="flex"> */}
                  <div className="font-bold">스트릭 </div>
                  <div className={styles.memo}>
                    *<span className={styles.highlight}>{modalResult.solveCount}일</span> 연속 문제를 푸셨어요!
                  </div>
                  {/* </div> */}
                  <div>
                    <Calendar
                      className={styles[`react-calendar`]}
                      formatDay={(locale, date) => moment(date).format("D")}
                      minDetail="month"
                      maxDetail="month"
                      navigationLabel={null}
                      showNeighboringMonth={false}
                      maxDate={new Date()}
                      tileContent={handleTileContent}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btns}>
            <button onClick={handleMoreQuestion} className={styles.moreQuizBtn}>
              더 풀어보기
            </button>
            <button
              className={styles.copyBtn}
              onClick={copyDummyDataToClipboard}
              disabled={!modalResult.isSolved}
              style={{
                backgroundColor: modalResult.isSolved ? "#ddd" : "",
                color: modalResult.isSolved ? "#eee" : "",
                cursor: modalResult.isSolved ? "" : "",
              }}
            >
              복사하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleplayModal;
