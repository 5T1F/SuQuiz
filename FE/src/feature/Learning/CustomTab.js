import React, { useState, useEffect, useMemo } from "react";
import WordList from "./WordList";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { allWordsByUser, wordsfromCategory, AllSubject, AllWordWithSubject } from "../../apis/learningApi";

function CustomTab({ selectedMain, selectedSub, setCurrentWord }) {
  const mainCategories = ["자음", "모음", "숫자", "낱말", "단어장"];
  const [subCategories, setSubCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(selectedMain || "자음");
  const [activeSubCategory, setActiveSubCategory] = useState(selectedSub || "");
  const [wordsProp, setWordsProp] = useState([]);
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === "단어장") {
          // "단어장" 메인 카테고리에 해당하는 API 호출
          const data = await allWordsByUser(userId);
          setWordsProp(data.data.wordList);
        } else if (activeTab === "낱말" && activeSubCategory) {
          // "낱말" 메인 카테고리 및 선택된 서브 카테고리에 해당하는 API 호출
          const wordData = await AllWordWithSubject(userId, activeSubCategory);
          setWordsProp(wordData.data.wordList);
        } else {
          // 다른 메인 카테고리에 해당하는 API 호출
          const data = await wordsfromCategory(userId, activeTab);
          setWordsProp(data.data);
        }

        if (activeTab === "낱말") {
          const subjectData = await AllSubject();
          console.log(subjectData.data);
          // "테스트"와 "none"을 제외한 주제들만 필터링
          const filteredSubjects = subjectData.data.filter(
            (subject) => subject.subjectName !== "테스트" && subject.subjectName !== "none"
          );
          setSubCategories(filteredSubjects);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, activeTab, activeSubCategory]);

  useEffect(() => {
    setActiveTab(selectedMain);
    setActiveSubCategory(selectedSub);
  }, [selectedMain, selectedSub]);

  const handleSubCategoryChange = (subCategoryName) => {
    setActiveSubCategory(subCategoryName);
    console.log("활성화된 서브카테고리 변경:", activeSubCategory);
  };

  return (
    <>
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
        <TabsHeader className="p-2 text-sm text-gray-600 bg-gray-200 rounded-xl justify-center">
          {mainCategories.map((category) => (
            <Tab
              key={category}
              value={category}
              onClick={() => setActiveTab(category)} // 탭 클릭 시 activeTab 업데이트
              className={`flex items-center h-9 mx-1 w-auto px-2 text-lg font-medium rounded-lg outline-none ${
                activeTab === category
                  ? " text-orange-500 shadow bg-white"
                  : "text-gray-500 cursor-pointer  hover:text-orange-500 hover:ring-2 hover:ring-orange-500 hover:ring-inset"
              }`}
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
                  <div className="flex justify-around items-center px-3 rounded-xl">
                    {category === "낱말" &&
                      subCategories.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSubCategoryChange(item.subjectName)}
                          className="mx-1 my-2 px-4 py-1.5 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-custom-orange focus:ring-opacity-75 transition-colors duration-500"
                        >
                          {item.subjectName}
                        </button>
                      ))}
                  </div>
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
