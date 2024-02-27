import React, { useState, useEffect } from "react";
import WordList from "./WordList";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { allWordsByUser, wordsfromCategory, AllSubject, AllWordWithSubject } from "../../apis/learningApi";

function CustomTab({ selectedMain, selectedSub, setCurrentWord }) {
  const mainCategories = ["자음", "모음", "숫자", "낱말", "단어장"];
  const [subCategories, setSubCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(selectedMain || "자음");
  const [activeSubCategory, setActiveSubCategory] = useState(selectedSub || "");
  const [wordsProp, setWordsProp] = useState([]);
  const storedId = sessionStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === "단어장") {
          const data = await allWordsByUser(userId);
          setWordsProp(data.data.wordList);
        } else if (activeTab === "낱말" && activeSubCategory) {
          const wordData = await AllWordWithSubject(userId, activeSubCategory);
          setWordsProp(wordData.data.wordList);
        } else {
          const data = await wordsfromCategory(userId, activeTab);
          setWordsProp(data.data);
        }

        if (activeTab === "낱말") {
          const subjectData = await AllSubject();
          console.log(subjectData.data);
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
        <TabsHeader className="p-2 text-sm text-gray-600 bg-[#DEDEDE] rounded-xl justify-center">
          {mainCategories.map((category) => (
            <Tab
              key={category}
              value={category}
              onClick={() => setActiveTab(category)}
              className={`flex items-center h-9 mx-1 w-auto px-2 text-xl font-medium rounded-lg outline-none ${
                activeTab === category
                  ? " text-custom-orange shadow bg-white"
                  : "text-gray-500 cursor-pointer  hover:text-custom-orange hover:ring-2 hover:ring-white hover:ring-inset"
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
                  <div className="flex items-center justify-around px-3 overflow-x-auto text-xl rounded-xl">
                    {category === "낱말" &&
                      subCategories.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSubCategoryChange(item.subjectName)}
                          className="mx-1 my-2 px-4 py-1.5 bg-orange-300 text-white font-medium rounded-lg shadow-md hover:bg-orange-400 focus:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-custom-orange focus:ring-opacity-75 transition-colors duration-500"
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
