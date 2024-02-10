import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import Flashcard from "../feature/Learning/Flashcard";
import SideMenu from "../feature/Learning/SideMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { wordsfromCategory, AllWordWithSubject } from "../apis/learningApi";
import MyCam from "../feature/Learning/MyCam";

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
    <Container>
      <h1 className="text-3xl font-bold underline">학습 시작 페이지</h1>
      <div className="flex">
        {/* 사이드메뉴 */}
        <div className="w-[270px] h-[90vh] p-1 border-4 border-red-500">
          <SideMenu
            selectedMain={selectedMain}
            selectedSub={selectedSub}
            wordList={wordList}
            setCurrentWord={setCurrentWord}
          />
        </div>
        {/* 학습 화면 */}
        <div className="px-40 border-4 border-violet-500 w-full">
          {/* 플래시 카드 */}
          <div className="border-4 border-yellow-500 w-full">
            플래시카드
            {currentWord && <Flashcard currentWord={currentWord} setCurrentWord={handleSetCurrentWord} />}
          </div>
          {/* 유저 실시간 화면 */}
          <div>
            유저 실시간 화면
            {/* <UserView /> */}
            <MyCam categoryNumber={3} changeFinger={changeFinger} />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleEnd}
              className="ml-auto h-8 px-5 font-medium rounded-lg outline-none ring-2 ring-yellow-600 ring-inset text-gray-800 hover:text-yellow-600"
            >
              학습 종료
            </button>
          </div>
          <div>${finger}</div>
        </div>
      </div>
    </Container>
  );
}
