import React, { useState } from "react";

function SelectCategory() {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSubArea, setSelectedSubArea] = useState("");
  const [start, setStart] = useState(false);

  const mainCategories = ["consonants", "vowels", "numbers", "words", "vocabulary"];
  const subCategories = ["subArea1", "subArea2", "subArea3"];

  const handleMainCategorySelect = (category) => {
    setSelectedArea(category);
    setStart(category !== "words");
    if (category !== "words") setSelectedSubArea("");
  };

  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubArea(subCategory);
    setStart(true);
  };

  return (
    <div>
      {/* 기본 카테고리 선택 버튼들 */}
      {mainCategories.map((category) => (
        <button key={category} onClick={() => handleMainCategorySelect(category)}>
          {category}
        </button>
      ))}

      {/* '낱말' 선택 시 추가적인 선택지 */}
      {selectedArea === "words" &&
        subCategories.map((subCategory) => (
          <button key={subCategory} onClick={() => handleSubCategorySelect(subCategory)}>
            {subCategory}
          </button>
        ))}

      {/* 시작하기 부분에 선택한 카테고리와 서브카테고리 표시 */}
      {start && (
        <div>
          선택한 카테고리: {selectedArea}
          {selectedArea === "words" && <div>선택한 서브 카테고리: {selectedSubArea}</div>}
          <div>시작하기</div>
        </div>
      )}
    </div>
  );
}

export default SelectCategory;
