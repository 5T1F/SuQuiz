import React, { useState, useEffect } from "react";
import WordList from "./WordList";

const wordLists = {
  자음: [
    { word: "ㄱ", status: "before" },
    { word: "ㄴ", status: "before" },
    { word: "ㄷ", status: "before" },
    { word: "ㄹ", status: "before" },
    { word: "ㅁ", status: "before" },
    { word: "ㅂ", status: "before" },
    { word: "ㅅ", status: "before" },
    // ... 추가적인 자음
  ],
  모음: [
    { word: "ㅏ", status: "before" },
    { word: "ㅑ", status: "before" },
    { word: "ㅓ", status: "before" },
    { word: "ㅕ", status: "before" },
    { word: "ㅗ", status: "before" },
    { word: "ㅛ", status: "before" },
    { word: "ㅜ", status: "before" },
    { word: "ㅠ", status: "before" },
    // ... 추가적인 모음
  ],
  숫자: [
    { word: "1", status: "before" },
    { word: "2", status: "before" },
    { word: "3", status: "before" },
    // ... 추가적인 숫자
  ],
  낱말: [
    { word: "사과", status: "before" },
    { word: "바나나", status: "before" },
    { word: "포도", status: "before" },
    // ... 추가적인 낱말
  ],
  단어장: [
    { word: "학교", status: "before" },
    { word: "도서관", status: "before" },
    { word: "병원", status: "before" },
    // ... 추가적인 단어장 내용
  ],
  // ... 추가적인 카테고리 및 단어 목록
};

function Tab({ selectedMain, selectedSub }) {
  const [activeTab, setActiveTab] = useState(selectedMain || "자음"); // '자음'을 기본값으로 설정

  useEffect(() => {
    if (selectedMain) {
      setActiveTab(selectedMain);
    }
  }, [selectedMain]);

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        fontWeight: activeTab === id ? "bold" : "normal",
        borderBottom: activeTab === id ? "2px solid black" : "none",
      }}
    >
      {label}
    </button>
  );

  // console.log("활성화된 탭:", activeTab);
  // console.log("활성화된 탭에 해당되는 단어리스트", wordLists[activeTab]);

  return (
    <>
      <div>탭</div>
      <div>
        <TabButton id="자음" label="자음" />
        <TabButton id="모음" label="모음" />
        <TabButton id="숫자" label="숫자" />
        <TabButton id="낱말" label="낱말" />
        <TabButton id="단어장" label="단어장" />
      </div>
      <div>
        {wordLists[activeTab] ? (
          <WordList wordsProp={wordLists[activeTab]} />
        ) : (
          <div>해당 탭에 단어 목록이 없습니다.</div>
        )}
      </div>
    </>
  );
}

export default Tab;
