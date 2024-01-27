import React, { useState } from "react";

function SelectCategory({ startLearning }) {
  const [selectedMain, setselectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [start, setStart] = useState(false);

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
    <div>
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
          <button onClick={startLearning}>시작하기</button>
        </div>
      )}
    </div>
  );
}

export default SelectCategory;
