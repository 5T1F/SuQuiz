import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import Flashcard from "../feature/Learning/Flashcard";
import SideMenu from "../feature/Learning/SideMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { wordsfromCategory, AllWordWithSubject } from "../apis/learningApi";
import MyCam from "../feature/Learning/MyCam";
import styles from "./LearningStartPage.module.css";

export default function LearningStartPage() {
  const location = useLocation();
  const { selectedMain, selectedSub } = location.state || {
    selectedMain: null,
    selectedSub: null,
  };
  const [currentWord, setCurrentWord] = useState(null);
  const [wordList, setWordList] = useState([]);
  const navigate = useNavigate();
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  const handleSetCurrentWord = (updatedWord) => {
    setCurrentWord(updatedWord);
  };

  // motion detect value
  const [finger, setFinger] = useState("");
  const changeFinger = (value) => {
    setFinger(value);
  };

  // const []

  console.log(selectedMain, selectedSub);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await wordsfromCategory(userId, selectedMain);
        setWordList(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMain, selectedSub]);

  const handleEnd = () => {
    const userConfirmed = window.confirm("학습을 종료하고 메인 페이지로 이동하시겠습니까?");
    if (userConfirmed) {
      alert("확인되었습니다. 메인 페이지로 이동합니다.");
      navigate("/"); // 메인 페이지 경로로 이동
    } else {
      alert("취소되었습니다. 계속 학습을 진행합니다.");
    }
  };

  return (
    <>
      <div className="flex h-[90vh]">
        {/* 사이드메뉴 */}
        <div className="px-16 py-6 bg-gray-100 ">
          <SideMenu
            selectedMain={selectedMain}
            selectedSub={selectedSub}
            wordList={wordList}
            setCurrentWord={setCurrentWord}
          />
        </div>
        {/* 학습 화면 */}
        <Container>
          <div className="flex flex-col justify-center">
            {/* 플래시 카드 */}
            <div className="pt-6">
              {currentWord && <Flashcard currentWord={currentWord} setCurrentWord={handleSetCurrentWord} />}
            </div>
            {/* 유저 실시간 화면 */}
            <div className={styles.myCamContainer}>
              <MyCam className={styles.video} categoryNumber={3} changeFinger={changeFinger} />
              <div>
                '{JSON.parse(localStorage.getItem("nicknameStorage")).state.userNickname}' 님이 동작한 수어는 '{finger}'
                입니다
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={handleEnd}
                className="ml-auto h-8 px-5 font-medium rounded-lg outline-none ring-2 ring-custom-orange ring-inset text-gray-700 hover:text-custom-orange"
              >
                학습 종료
              </button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
