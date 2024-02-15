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
  const storedId = sessionStorage.getItem("idStorage");
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
      <div className="flex h-[90vh] overflow-hidden">
        {/* 학습 화면 */}
        {/* 사이드메뉴 */}
        <div className="px-10 py-6 bg-[#f3f3f3] ">
          <SideMenu
            selectedMain={selectedMain}
            selectedSub={selectedSub}
            wordList={wordList}
            setCurrentWord={setCurrentWord}
          />
        </div>
        <Container>
          <div className="flex flex-row justify-center items-end mt-44 mb-10">
            {/* 플래시 카드 */}
            {currentWord && <Flashcard currentWord={currentWord} setCurrentWord={handleSetCurrentWord} />}
            {/* 유저 실시간 화면 */}
            <div className={styles.myCamContainer}>
              <div className={styles.description}>왼쪽에서 학습하고 싶은 단어를 골라 따라해보세요</div>
              <MyCam className={styles.video} categoryNumber={3} changeFinger={changeFinger} />
              <div className={styles.description2}>
                '{JSON.parse(sessionStorage.getItem("nicknameStorage")).state.userNickname}' 님이 동작한 수어는 '
                {finger}' 입니다
              </div>
            </div>
          </div>
          {/* 학습종료 버튼 */}
          <div className={styles.buttonContainer}>
            <button
              onClick={handleEnd}
              className="px-6 py-2 mr-6 border-custom-orange bg-white rounded-lg shadow border-2  hover:bg-orange-300 transition duration-300"
            >
              학습 종료
            </button>
          </div>
        </Container>
      </div>
    </>
  );
}
