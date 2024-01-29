import React, { useState } from "react";
import Container from "../components/Container";
import Flashcard from "../feature/Learning/Flashcard";
import SideMenu from "../feature/Learning/SideMenu";
import { useLocation } from "react-router-dom";
import styles from "./LearningStartPage.module.css";

const wordLists = {
  자음: [
    { word: "ㄱ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "ㄴ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "ㄷ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "ㄹ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "ㅁ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "ㅂ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "ㅅ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    // ... 추가적인 자음
  ],
  모음: [
    { word: "ㅏ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "ㅑ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "ㅓ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "ㅕ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "ㅗ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "ㅛ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "ㅜ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "ㅠ", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    // ... 추가적인 모음
  ],
  숫자: [
    { word: "1", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "2", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "3", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    // ... 추가적인 숫자
  ],
  낱말: [
    { word: "사과", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "바나나", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "포도", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    // ... 추가적인 낱말
  ],
  단어장: [
    { word: "학교", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "도서관", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    { word: "병원", status: "before", videoUrl: "https://www.youtube.com/embed/3eQaabQQm-g?si=OQAtsp5lUZPZvtK_" },
    // ... 추가적인 단어장 내용
  ],
  // ... 추가적인 카테고리 및 단어 목록
};

export default function LearningStartPage() {
  const location = useLocation();
  const { selectedMain, selectedSub } = location.state || { selectedMain: null, selectedSub: null };
  const [currentWord, setCurrentWord] = useState(null);

  return (
    <Container>
      <h1 className="text-3xl font-bold underline">학습 시작 페이지</h1>
      <div className={styles.layout}>
        <div className={styles.sideMenu}>
          <SideMenu
            selectedMain={selectedMain}
            selectedSub={selectedSub}
            wordLists={wordLists}
            setCurrentWord={setCurrentWord}
          />
        </div>
        <div className={styles.learningScreen}>{currentWord && <Flashcard currentWord={currentWord} />}</div>
      </div>
    </Container>
  );
}
