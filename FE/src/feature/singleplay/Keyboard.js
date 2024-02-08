import React, { useState } from "react";
import styles from "./Keyboard.module.css";

const Keyboard = ({ handleKeyPress, handleBackspace, handleEnter, inputString, rightGuess }) => {
  const [buttonColors, setButtonColors] = useState(Array.from({ length: 40 }, () => "white")); // 초기 상태: 모든 버튼이 흰색
  const [greenButtons, setGreenButtons] = useState(new Set()); // 초록색 버튼 정보를 저장할 Set

  // 자음과 모음 배열 정의
  const consonants = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

  const vowels = ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ", "ㅐ", "ㅒ", "ㅔ", "ㅖ", "ㅢ", "ㅚ", "ㅟ"];

  // 버튼을 렌더링하는 함수
  const renderButtons = (letters) => {
    return letters.map((letter, index) => (
      <button key={index} style={{ backgroundColor: buttonColors[index] }} onClick={() => handleClick(letter, index)}>
        {letter}
      </button>
    ));
  };

  // 버튼 클릭 이벤트 핸들러
  const handleClick = (letter, index) => {
    handleKeyPress(letter);
    const newColors = [...buttonColors];
    newColors[index] = getButtonColor(letter);
    setButtonColors(newColors);
  };

  // 엔터를 눌렀을 때 버튼 색상 업데이트 및 이벤트 핸들링
  const handleEnterAndChangeColor = () => {
    const newColors = buttonColors.map((color, index) => {
      const letter = indexToLetter(index);
      if (letter === "") return color; // 인덱스에 해당하는 글자가 없는 경우 유지
      return getButtonColor(letter);
    });
    setButtonColors(newColors);
    handleEnter();
  };

  // 인덱스에 해당하는 글자를 반환하는 함수
  const indexToLetter = (index) => {
    if (index < consonants.length) return consonants[index];
    else if (index < consonants.length + vowels.length) return vowels[index - consonants.length];
    else return "";
  };

  // 버튼 색상을 결정하는 함수
  const getButtonColor = (letter) => {
    if (inputString.includes(letter)) {
      if (inputString.indexOf(letter) === rightGuess.indexOf(letter)) {
        setGreenButtons((prev) => new Set(prev).add(letter));
        return "#00C853"; // 자리와 글자가 모두 일치하는 경우 (초록색)
      } else {
        return "#FFEA00"; // 자리는 다르지만 글자가 포함된 경우 (노란색)
      }
    } else {
      return "white"; // 입력한 값에 해당하지 않는 버튼인 경우 (흰색)
    }
  };

  return (
    <div className={styles.keyboard}>
      <div>
        {/* 한글 자음 버튼들 */}
        {renderButtons(consonants)}
      </div>

      <div>
        {/* 한글 모음 버튼들 */}
        {renderButtons(vowels)}
      </div>

      {/* 백스페이스 버튼 */}
      <button onClick={handleBackspace}>⌫</button>

      {/* Enter 버튼 */}
      <button onClick={handleEnterAndChangeColor}>Enter</button>
    </div>
  );
};

export default Keyboard;
