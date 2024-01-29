import React, { useState, useEffect } from "react";
import WordList from "./WordList";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";

function CustomTab({ selectedMain, selectedSub, wordList, setCurrentWord }) {
  const [activeTab, setActiveTab] = useState(selectedMain || "자음");

  // 카테고리 가져오는 api 대신
  const mainCategories = ["자음", "모음", "숫자", "낱말", "단어장"];
  // const subCategories = ["동물", "사물", "일상"];

  useEffect(() => {
    if (selectedMain) {
      setActiveTab(selectedMain);
    }
  }, [selectedMain]);

  return (
    <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
      <TabsHeader>
        {mainCategories.map(
          (
            category,
            index // index 변수 추가
          ) => (
            <Tab key={index} value={category}>
              <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {category}
              </div>
            </Tab>
          )
        )}
      </TabsHeader>
      <TabsBody>
        {wordList.map(
          (
            word,
            index // index 변수 추가, word 변수 사용
          ) => (
            <TabPanel key={index} value={word.category}>
              <WordList
                wordsProp={wordList.filter((w) => w.category === word.category)}
                setCurrentWord={setCurrentWord}
              />
            </TabPanel>
          )
        )}
      </TabsBody>
    </Tabs>
  );
}

export default CustomTab;
