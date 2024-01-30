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
    <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
      <TabsHeader
        className="flex rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className: "bg-transparent border-b-2 border-blue-900 shadow-none rounded-none",
        }}
      >
        {mainCategories.map((category) => (
          <Tab
            key={category}
            value={category}
            onClick={() => setActiveTab(category)}
            className={`flex-1 ${activeTab === category ? " border-blue-500" : "cursor-pointer hover:text-blue-500"}`}
          >
            {category}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {mainCategories.map(
          (category) =>
            activeTab === category && (
              <TabPanel key={category} value={category}>
                <WordList wordsProp={wordList.filter((w) => w.category === category)} setCurrentWord={setCurrentWord} />
              </TabPanel>
            )
        )}
      </TabsBody>
    </Tabs>
  );
}

export default CustomTab;
