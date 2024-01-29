import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectCategory() {
  const [selectedMain, setselectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [start, setStart] = useState(false);

  const navigate = useNavigate();

  const mainCategories = ["자음", "모음", "숫자", "낱말", "단어장"];
  const subCategories = ["동물", "사물", "일상"];

  const handleMain = (category) => {
    setselectedMain(category);
    setStart(category !== "낱말");
    if (category !== "낱말") setSelectedSub("");
  };

  const handleSub = (subCategory) => {
    setSelectedSub(subCategory);
    setStart(true);
  };

  const handleStart = () => {
    navigate("/learning/start", { state: { selectedMain, selectedSub } }); // v6에서 사용하는 경우
  };

  const CategoryButtons = ({ categories, onClick }) => (
    <>
      {categories.map((category) => (
        <button key={category} onClick={() => onClick(category)}>
          {category}
        </button>
      ))}
    </>
  );

  return (
    <>
      <CategoryButtons categories={mainCategories} onClick={handleMain} />
      {selectedMain === "낱말" && (
        <div>
          <CategoryButtons categories={subCategories} onClick={handleSub} />
        </div>
      )}
      {start && (
        <div>
          <div>선택한 카테고리: {selectedMain}</div>
          {selectedMain === "낱말" && <div>선택한 서브 카테고리: {selectedSub}</div>}
          <button onClick={handleStart}>시작하기</button>
        </div>
      )}
    </>
  );
}
