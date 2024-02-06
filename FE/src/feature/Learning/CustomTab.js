import React, { useState, useEffect, useMemo } from "react";
import WordList from "./WordList";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { allWordsByUser, wordsfromCategory } from "../../apis/learningApi";

function CustomTab({ selectedMain, selectedSub, setCurrentWord }) {
  const mainCategories = ["자음", "모음", "숫자", "낱말", "단어장"];
  const [activeTab, setActiveTab] = useState(selectedMain || "자음");
  const [wordsProp, setWordsProp] = useState([]);

  const activeTabWords = useMemo(() => {
    if (activeTab === "단어장") {
      return wordsProp;
    } else {
      return wordsProp.filter((word) => word.category === activeTab);
    }
  }, [wordsProp, activeTab]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];
        if (activeTab === "단어장") {
          const response = await allWordsByUser("asd@naver.com"); //////////////유저이메일 수정할 것
          data = response.data.wordList;
          console.log(data);
        } else {
          const response = await wordsfromCategory(1, activeTab); ///////////////유저아이디 수정할 것
          data = response.data;
        }
        setWordsProp(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [activeTab]);

  useEffect(() => {
    setActiveTab(selectedMain);
  }, [selectedMain]);

  return (
    <>
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
        <TabsHeader className="p-1 text-sm text-gray-600 bg-gray-500/5 rounded-xl">
          {mainCategories.map((category) => (
            <Tab
              key={category}
              value={category}
              onClick={() => setActiveTab(category)} // 탭 클릭 시 activeTab 업데이트
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
                  <WordList wordsProp={activeTabWords} setCurrentWord={setCurrentWord} />
                </TabPanel>
              )
          )}
        </TabsBody>
      </Tabs>
    </>
  );
}

export default CustomTab;
