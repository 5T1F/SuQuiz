import React, { useState } from "react";

const Keyboard = ({ handleKeyPress, handleBackspace, handleEnter, inputString, rightGuess }) => {
  const [buttonColors, setButtonColors] = useState(Array.from({ length: 40 }, () => "white")); // 초기 상태: 모든 버튼이 흰색
  const [greenButtons, setGreenButtons] = useState(new Set()); // 초록색 버튼 정보를 저장할 Set

  const handleClick = (letter, index) => {
    handleKeyPress(letter);
    const newColors = [...buttonColors];
    newColors[index] = getButtonColor(letter);
    setButtonColors(newColors);
  };

  const handleEnterAndChangeColor = () => {
    // 엔터를 눌렀을 때 버튼 색상 업데이트
    const newColors = buttonColors.map((color, index) => {
      const letter = indexToLetter(index);
      if (letter === "") return color; // 인덱스에 해당하는 글자가 없는 경우 유지
      return getButtonColor(letter);
    });
    setButtonColors(newColors);
    handleEnter();
  };

  const getButtonColor = (letter) => {
    if (inputString.includes(letter)) {
      // 입력한 값에 해당하는 버튼인 경우
      if (inputString.indexOf(letter) === rightGuess.indexOf(letter)) {
        // 자리와 글자가 모두 일치하는 경우 (초록색)
        setGreenButtons((prev) => new Set(prev).add(letter)); // 초록색 버튼 정보 저장
        return "#00C853";
      } else {
        // 자리는 다르지만 글자가 포함된 경우 (노란색)
        return "#FFEA00";
      }
    } else {
      // 입력한 값에 해당하지 않는 버튼인 경우 (흰색)
      return "white";
    }
  };

  // 인덱스를 키보드 버튼의 글자로 변환
  const indexToLetter = (index) => {
    const consonants = [
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];
    const vowels = [
      "ㅏ",
      "ㅐ",
      "ㅑ",
      "ㅒ",
      "ㅓ",
      "ㅔ",
      "ㅕ",
      "ㅖ",
      "ㅗ",
      "ㅘ",
      "ㅙ",
      "ㅚ",
      "ㅛ",
      "ㅜ",
      "ㅝ",
      "ㅞ",
      "ㅟ",
      "ㅠ",
      "ㅡ",
      "ㅢ",
      "ㅣ",
    ];
    if (index < consonants.length) return consonants[index];
    else return vowels[index - consonants.length];
  };

  return (
    <div className="keyboard">
      {/* 한글 자음 버튼들 */}
      {buttonColors.map((color, index) => (
        <button key={index} style={{ backgroundColor: color }} onClick={() => handleClick(indexToLetter(index), index)}>
          {indexToLetter(index)}
        </button>
      ))}

      {/* 백스페이스 버튼 */}
      <button onClick={handleBackspace}>⌫</button>

      {/* Enter 버튼 */}
      <button onClick={handleEnterAndChangeColor}>Enter</button>
    </div>
  );
};

export default Keyboard;
