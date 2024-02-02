import React from "react";

const Keyboard = ({ handleKeyPress, handleBackspace, handleEnter, inputString, rightGuess }) => {
  const getButtonColor = (letter) => {
    if (inputString.includes(letter)) {
      // 입력한 값에 해당하는 버튼인 경우
      if (inputString.indexOf(letter) === rightGuess.indexOf(letter)) {
        // 자리와 글자가 모두 일치하는 경우 (초록색)
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

  const handleClick = (letter) => {
    handleKeyPress(letter);
  };

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

  return (
    <div className="keyboard">
      {/* 한글 자음 버튼들 */}
      {consonants.map((consonant) => (
        <button
          key={consonant}
          style={{ backgroundColor: getButtonColor(consonant) }}
          onClick={() => handleClick(consonant)}
        >
          {consonant}
        </button>
      ))}

      {/* 한글 모음 버튼들 */}
      {vowels.map((vowel) => (
        <button key={vowel} style={{ backgroundColor: getButtonColor(vowel) }} onClick={() => handleClick(vowel)}>
          {vowel}
        </button>
      ))}

      {/* 백스페이스 버튼 */}
      <button onClick={handleBackspace}>⌫</button>

      {/* Enter 버튼 */}
      <button onClick={handleEnter}>Enter</button>
    </div>
  );
};

export default Keyboard;
