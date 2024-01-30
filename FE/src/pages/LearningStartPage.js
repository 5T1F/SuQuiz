import React, { useState } from "react";
import Container from "../components/Container";
import Flashcard from "../feature/Learning/Flashcard";
import SideMenu from "../feature/Learning/SideMenu";
import { useLocation } from "react-router-dom";
import UserView from "../feature/Learning/UserView";

const wordList = [
  {
    word: "ㄱ",
    videoUrl: "https://example.com/video-ㄱ.mp4",
    category: "자음",
    isBookmarked: false,
    status: "before",
  },
  {
    word: "ㄴ",
    videoUrl: "https://example.com/video-ㄱ.mp4",
    category: "자음",
    isBookmarked: false,
    status: "before",
  },
  {
    word: "ㄷ",
    videoUrl: "https://example.com/video-ㄱ.mp4",
    category: "자음",
    isBookmarked: false,
    status: "before",
  },
  {
    word: "ㅏ",
    videoUrl: "https://example.com/video-ㅏ.mp4",
    category: "모음",
    isBookmarked: false,
    status: "before",
  },
  {
    word: "ㅑ",
    videoUrl: "https://example.com/video-ㅏ.mp4",
    category: "모음",
    isBookmarked: false,
    status: "before",
  },
  {
    word: "ㅓ",
    videoUrl: "https://example.com/video-ㅏ.mp4",
    category: "모음",
    isBookmarked: false,
    status: "before",
  },
  {
    word: "1",
    videoUrl: "https://example.com/video-1.mp4",
    category: "숫자",
    isBookmarked: true,
    status: "before",
  },
  {
    word: "2",
    videoUrl: "https://example.com/video-1.mp4",
    category: "숫자",
    isBookmarked: true,
    status: "before",
  },
  {
    word: "3",
    videoUrl: "https://example.com/video-1.mp4",
    category: "숫자",
    isBookmarked: true,
    status: "before",
  },
  {
    word: "사과",
    videoUrl: "https://example.com/video-사과.mp4",
    category: "낱말",
    isBookmarked: true,
    status: "before",
  },
  // 여기에 추가적인 단어들을 포함시킬 수 있습니다.
];

export default function LearningStartPage() {
  const location = useLocation();
  const { selectedMain, selectedSub } = location.state || { selectedMain: null, selectedSub: null };
  const [currentWord, setCurrentWord] = useState(null);

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
            {currentWord && <Flashcard currentWord={currentWord} />}
          </div>
          {/* 유저 실시간 화면 */}
          <div className="border-4 border-orange-500 w-full">
            유저 실시간 화면
            <UserView />
          </div>
          <div className="flex justify-between">
            <button class="ml-auto h-8 px-5 font-medium rounded-lg outline-none ring-2 ring-yellow-600 ring-inset text-gray-800 hover:text-yellow-600">
              학습 종료
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
