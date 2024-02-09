// SingleplayModal.js 파일

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecordItem from "./RecordItem";
import styles from "./SingleplayModal.module.css";
import Streak from "./Streak";
import TrialSpread from "./TrialSpread";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { isSolved, dailyResult } from "../../apis/singleplayApi";
import { useWordleStore } from "../../app/store";

const SingleplayModal = ({ onClose }) => {
  // 상태 및 변수 선언
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  const [solved, setSolved] = useState(true);
  const [streakData, setStreakData] = useState(null);
  const [completedDates, setCompletedDates] = useState([]);
  const [incorrectDates, setIncorrectDates] = useState([]);
  const navigate = useNavigate();
  const [quizcorrect, setQuizCorrect] = useState({
    allTrialCount: 0,
    streak: {},
    solveCount: 0,
    correctCount: 0,
    maxCorrectCount: 0,
    trialSpread: [0, 0, 0, 0, 0],
    correctRate: 0,
  });
  const { result } = useWordleStore();

  const dummyStreakData = [
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, -1],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [-1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 0, 1, 1, 1, -1, 1, -1],
    [-1, 1, 0, 1, -1, -1, -1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 1, 1, -1, 1, 1],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
  ];

  useEffect(() => {
    setStreakData(dummyStreakData);
    const fetchData = async () => {
      try {
        const solved = await isSolved(userId);
        setSolved(solved.data);
        const data = await dailyResult(userId);
        setQuizCorrect(data.data);
        console.log(data.data);
        const completed = [];
        const incorrect = [];
        for (const date in data.data.streak) {
          if (data.data.streak.hasOwnProperty(date)) {
            const value = data.data.streak[date];
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setQuizCorrect(result);
  }, [result]);

  const copyDummyDataToClipboard = () => {
    let correctString = result.correct ? "성공" : "실패";
    correctString += ` ${result.trialCount}/6 ${quizcorrect.correctCount}\n`;

    const chunkString = (str, size) => {
      const chunkedArr = [];
      for (let i = 0; i < str.length; i += size) {
        chunkedArr.push(str.slice(i, i + size));
      }
      return chunkedArr;
    };

    const textChunks = chunkString(result.resultText, 5);
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
        {completedDateFound && <div className={styles.dot}>&#10004;</div>}
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
          <div className="modal-content">
            <div className="flex justify-center">
              {result.correct ? (
                <p>축하합니다! 정답을 맞추셨습니다!</p>
              ) : (
                <p>아쉽지만 게임 오버입니다. 정답을 맞추지 못했습니다.</p>
              )}
            </div>
            <div className="flex row">
              <RecordItem label="전체도전" value={quizcorrect.allTrialCount} color="green" />
              <RecordItem label="정답률" value={`${quizcorrect.correctRate}%`} color="blue" />
              <RecordItem label={"최근 연속 정답 기록"} value={quizcorrect.correctCount} color="yellow" />
              <RecordItem label={"최장 연속 스트릭"} value={quizcorrect.maxCorrectCount} color="red" />
            </div>
            <div className="flex row">
              <div className={styles.trialContainer}>
                <div>도전분포</div>
                <div>
                  <TrialSpread trialSpreadData={quizcorrect.trialSpread} />
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
                <div>연속 {quizcorrect.solveCount}일 달성중이에요!</div>
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
    </>
  );
};

export default SingleplayModal;
