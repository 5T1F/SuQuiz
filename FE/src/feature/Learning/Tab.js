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
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {mainCategories.map((category) => (
          <Tab
            key={category}
            value={category}
            onClick={() => setActiveTab(category)}
            className={`transition duration-300 ease-in-out ${
              activeTab === category ? "text-blue-500 border-b-2 border-blue-500" : "cursor-pointer hover:text-blue-500"
            }`}
          >
            {category}
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
