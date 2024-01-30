import React, { useState, useEffect } from "react";
import WordList from "./WordList";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";

function CustomTab({ selectedMain, wordList, setCurrentWord }) {
  const [activeTab, setActiveTab] = useState(selectedMain || "자음");

  // 카테고리 가져오는 api 대신
  const mainCategories = ["자음", "모음", "숫자", "낱말", "단어장"];

  useEffect(() => {
    if (selectedMain) {
      setActiveTab(selectedMain);
    }
  }, [selectedMain]);

  return (
    <>
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
        <TabsHeader className="p-1 text-sm text-gray-600 bg-gray-500/5 rounded-xl">
          {mainCategories.map((category) => (
            <Tab
              key={category}
              value={category}
              onClick={() => setActiveTab(category)}
              className={`flex items-center h-6 font-medium rounded-lg outline-none ${
                activeTab === category
                  ? "border-blue-500 text-yellow-500 shadow bg-white"
                  : "text-gray-500 cursor-pointer  hover:text-yellow-500 hover:ring-2 hover:ring-yellow-500 hover:ring-inset"
              }`}
            >
              {category}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="py-1">
          {mainCategories.map(
            (category) =>
              activeTab === category && (
                <TabPanel key={category} value={category}>
                  <WordList
                    wordsProp={wordList.filter((w) => w.category === category)}
                    setCurrentWord={setCurrentWord}
                  />
                </TabPanel>
              )
          )}
        </TabsBody>
      </Tabs>
    </>
  );
}

export default CustomTab;
