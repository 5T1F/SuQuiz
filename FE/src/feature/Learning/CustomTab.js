import React, { useState, useEffect } from "react";
import WordList from "./WordList";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { wordsfromCategory } from "../../apis/learningApi";

function CustomTab({ selectedMain, selectedSub, setCurrentWord }) {
  const [activeTab, setActiveTab] = useState(selectedMain || "자음");
  const mainCategories = ["자음", "모음", "숫자", "낱말", "단어장"];
  const [wordsProp, setWordsProp] = useState([]);

  useEffect(() => {
    setActiveTab(selectedMain);
    const fetchData = async () => {
      try {
        const data = await wordsfromCategory(selectedMain);
        setWordsProp(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMain, selectedSub]);

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
                  <WordList wordsProp={wordsProp} setCurrentWord={setCurrentWord} />
                </TabPanel>
              )
          )}
        </TabsBody>
      </Tabs>
    </>
  );
}

export default CustomTab;
