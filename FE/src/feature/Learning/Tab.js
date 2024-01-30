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
        {mainCategories.map((category) => (
          <Tab key={category} value={category}>
            <div>{category}</div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {mainCategories.map((category) => (
          <TabPanel key={category} value={category}>
            <WordList wordsProp={wordList.filter((w) => w.category === category)} setCurrentWord={setCurrentWord} />
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

export default CustomTab;
