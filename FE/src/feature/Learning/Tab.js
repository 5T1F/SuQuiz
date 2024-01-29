import React, { useState, useEffect } from "react";
import WordList from "./WordList";
// import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";

function Tab({ selectedMain, selectedSub, wordLists, setCurrentWord }) {
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
          <WordList wordsProp={wordLists[activeTab]} setCurrentWord={setCurrentWord} />
        ) : (
          <div>해당 탭에 단어 목록이 없습니다.</div>
        )}
      </div>
    </>
  );
}

export default Tab;
