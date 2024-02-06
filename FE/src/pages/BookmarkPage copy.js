import React, { useState } from "react";
import Container from "../components/Container";
import Flashcard from "../feature/Learning/Flashcard";
import SideMenu from "../feature/Learning/SideMenu";
import { useLocation } from "react-router-dom";
import UserView from "../feature/Learning/UserView";

// 학습하기 복붙해놓은 거라
// 살짝 바꿔야 됨
const wordList = [
  {
    // api 명세 보고 채우기
  },
];

export default function BookmarkPage() {
  const location = useLocation();
  const { selectedMain, selectedSub } = location.state || { selectedMain: null, selectedSub: null };
  const [currentWord, setCurrentWord] = useState(null);

  return (
    <>
      <Container>
        <h1 className="text-3xl font-bold underline">학습 시작 페이지</h1>
        <div className="flex">
          {/* 사이드메뉴 */}
          <div className="w-[270px] h-[90vh] p-1 border-4 border-red-500">
            {/* 단어장이니까 피그마 보고 바꾸기 */}
            <SideMenu
              selectedMain={selectedMain}
              selectedSub={selectedSub}
              wordList={wordList}
              setCurrentWord={setCurrentWord}
            />
          </div>
          {/* 학습 화면 */}
          <div className="w-full px-40 border-4 border-violet-500">
            {/* 플래시 카드 */}
            <div className="w-full border-4 border-yellow-500">
              플래시카드
              {currentWord && <Flashcard currentWord={currentWord} />}
            </div>
            {/* 유저 실시간 화면 */}
            <div className="w-full border-4 border-orange-500">
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
    </>
  );
}
