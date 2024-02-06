import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectCategory() {
  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const navigate = useNavigate();

  const mainCategories = ["자음", "모음", "숫자", "낱말", "단어장"];
  const subCategories = ["동물", "사물", "일상"];

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

  const CategoryButton = ({ category, onClick }) => (
    <button
      className="w-16 h-9 p-5 bg-white rounded-lg shadow border-2 border-amber-200 flex justify-center items-center"
      onClick={() => onClick(category)}
    >
      <div className="text-center text-yellow-950 text-base">{category}</div>
    </button>
  );

  return (
    <div className="w-full max-w-4xl h-[90vh] flex flex-col justify-start items-center gap-8">
      <div className="text-yellow-950 text-base font-black">오늘의 학습 분야를 선택하세요</div>
      <div className="flex justify-center items-center gap-6">
        {mainCategories.map((category) => (
          <CategoryButton key={category} category={category} onClick={handleMainCategoryChange} />
        ))}
      </div>
      {selectedMain === "낱말" && (
        <div className="flex flex-col justify-start items-center gap-6">
          <div className="text-yellow-950 text-base font-black">낱말 주제를 고르세요</div>
          <div className="flex justify-center items-center gap-6">
            {subCategories.map((subCategory) => (
              <CategoryButton key={subCategory} category={subCategory} onClick={handleSubCategoryChange} />
            ))}
          </div>
        </div>
      )}
      {((selectedMain && selectedMain !== "낱말") || (selectedMain === "낱말" && selectedSub)) && (
        <button
          onClick={handleStart}
          className="px-6 py-2 bg-amber-200  hover:bg-amber-400 rounded-lg shadow border-2 border-amber-200 flex justify-center items-center transition duration-300"
        >
          <div className="text-center text-yellow-950 text-base font-black">시작하기</div>
        </button>
      )}
    </div>
  );
}
