import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { AllSubject } from "../../apis/learningApi";

export default function SelectCategory() {
  const navigate = useNavigate();
  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");

  const mainCategories = ["자음", "모음", "숫자", "낱말", "단어장"];
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectData = await AllSubject();
        // "테스트"와 "none"을 제외한 주제들만 필터링
        const filteredSubjects = subjectData.data.filter(
          (subject) => subject.subjectName !== "테스트" && subject.subjectName !== "none"
        );

        // 중복 제거 로직 추가
        const uniqueSubjects = Array.from(new Set(filteredSubjects.map((sub) => sub.subjectName))).map(
          (subjectName) => {
            return filteredSubjects.find((sub) => sub.subjectName === subjectName);
          }
        );

        setSubCategories(uniqueSubjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleMainCategoryChange = (category) => {
    setSelectedMain(category);
    if (category !== "낱말") {
      setSelectedSub("");
    }
  };

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSub(subCategory);
  };

  const handleStart = () => {
    navigate("/learning/start", { state: { selectedMain, selectedSub } });
  };

  const CategoryButton = ({ category, onClick, isSelected }) => (
    <button
      className={`mx-1 my-2 px-4 py-1.5 border-2 ${
        isSelected ? "bg-orange-100 text-white  ring-1 ring-custom-orange" : "bg-white text-orange-100 "
      } font-medium rounded-lg border-none shadow-md hover:bg-orange-200 hover:text-white  focus:ring-1 focus:ring-custom-orange focus:ring-opacity-75 transition-colors duration-500`}
      onClick={() => onClick(category)}
    >
      <div>{category}</div>
    </button>
  );

  // 부모 컨테이너에 적용할 variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // 자식 요소들이 0.2초 간격으로 차례대로 나타남
      },
    },
  };

  // 자식 요소에 적용할 variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 100,
      transition: {
        duration: 0.5, // 애니메이션 지속 시간
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-[90vh] flex flex-col justify-center items-center gap-8"
    >
      <motion.div variants={itemVariants} className="font-bold text-2xl">
        오늘의 학습 분야를 골라볼까요?
      </motion.div>
      <motion.div variants={itemVariants} className="flex justify-center items-center gap-6">
        {mainCategories.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            onClick={handleMainCategoryChange}
            isSelected={selectedMain === category}
          />
        ))}
      </motion.div>
      {selectedMain === "낱말" && (
        <div className="flex flex-col justify-start items-center gap-6">
          <motion.div variants={itemVariants} className="font-bold text-2xl">
            낱말 주제도 골라보세요!
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="w-[40vw] flex justify-center items-center gap-6 overflow-x-auto"
          >
            {subCategories.map((item) => {
              return (
                <CategoryButton
                  key={item.subjectName}
                  category={item.subjectName}
                  onClick={handleSubCategoryChange}
                  isSelected={selectedSub === item.subjectName}
                />
              );
            })}
          </motion.div>
        </div>
      )}
      {((selectedMain && selectedMain !== "낱말") || (selectedMain === "낱말" && selectedSub)) && (
        <>
          <motion.div variants={itemVariants} className="font-semibold text-2xl  text-center">
            그럼,{" "}
            <span className="text-[#d19372]">
              {JSON.parse(localStorage.getItem("nicknameStorage")).state.userNickname}님!
            </span>{" "}
            SuQuiz와 함께 수어 학습을 시작해 볼까요?
            <motion.div
              variants={itemVariants}
              className="font-medium text-lg shadow bg-orange-200 rounded-lg mt-2 p-1 px-2"
            >
              선택한 학습 분야는 '{selectedMain}
              {selectedSub ? `' 이고, 주제는 '` : null}
              {selectedSub ? selectedSub : null}' 입니다.
            </motion.div>
          </motion.div>
          <motion.div
            onClick={handleStart}
            className="px-6 py-2 border-[#d19372] bg-white rounded-lg shadow-md border-1 hover:text-white hover:bg-[#d19372]  transition duration-300"
          >
            학습 시작하기
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
