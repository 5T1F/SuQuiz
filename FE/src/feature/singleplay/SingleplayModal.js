// SingleplayModal.js 파일

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecordItem from "./RecordItem";
import styles from "./SingleplayModal.module.css";
import TrialSpread from "./TrialSpread";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { isSolved } from "../../apis/singleplayApi";
import { allWords } from "../../apis/learningApi";
import { useWordleStore } from "../../app/store";

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

  console.log(modalResult);

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

    const textChunks = chunkString(modalResult.modalResultText, 5);
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
        {incorrectDateFound && <div className={styles.dot}>&#10060;</div>}
      </div>
    );
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className="flex row justify-between">
            <div className="modal-title">싱글 플레이 결과</div>
            <button onClick={onClose}>닫기</button>
          </div>

          <div className="flex justify-center">
            {modalResult.correct ? (
              <p>축하합니다! 정답을 맞추셨습니다!</p>
            ) : (
              <p>아쉽지만 게임 오버입니다. 정답을 맞추지 못했습니다.</p>
            )}
          </div>
          <div className="flex row">
            <div className={styles.wordContent}>
              {wordInfo ? (
                <>
                  <div>단어 정보</div>
                  <div>카테고리: {wordInfo.category}</div>
                  {wordInfo?.subjectName && <div>주제명: {wordInfo.subjectName}</div>}
                  <div>단어명: {wordInfo.wordName}</div>
                  <div>북마크 여부: {wordInfo.bookmarked}</div>
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
              <div className="flex row">
                <RecordItem label="전체도전" value={modalResult.allTrialCount} color="green" />
                <RecordItem label="정답률" value={`${modalResult.correctRate}%`} color="blue" />
                <RecordItem label={"최근 연속 정답 기록"} value={modalResult.correctCount} color="yellow" />
                <RecordItem label={"최장 연속 스트릭"} value={modalResult.maxCorrectCount} color="red" />
              </div>
              <div className="flex row">
                <div className={styles.trialContainer}>
                  <div>도전분포</div>
                  <div>
                    <TrialSpread trialSpreadData={modalResult.trialSpread} />
                  </div>
                </div>
                <div className={styles.streakContainer}>
                  <div>오늘의 단어 스트릭</div>
                  <div>
                    <Calendar
                      className={styles.reactCalendar}
                      formatDay={(locale, date) => moment(date).format("D")}
                      minDetail="month"
                      maxDetail="month"
                      navigationLabel={null}
                      showNeighboringMonth={false}
                      maxDate={new Date()}
                      tileContent={handleTileContent}
                    />
                  </div>
                  <div>연속 {modalResult.solveCount}일 문제를 푸셨어요!</div>
                </div>
              </div>
              <div className="float-right mt-3">
                <button onClick={handleMoreQuestion} className="mr-2">
                  더 풀어보기
                </button>
                {solved ? (
                  <button
                    onClick={copyDummyDataToClipboard}
                    disabled={solved}
                    style={{ backgroundColor: solved ? "#ccc" : "#007bff", color: "#ffffff" }}
                  >
                    복사하기
                  </button>
                ) : (
                  <button onClick={copyDummyDataToClipboard}>복사하기</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleplayModal;
