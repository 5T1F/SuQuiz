import React from "react";

const Keyboard = ({ handleKeyPress, handleBackspace, handleEnter }) => {
  const handleClick = (letter) => {
    handleKeyPress(letter);
  };

  return (
    <div className="keyboard">
      {/* 한글 자음 버튼들 */}
      <button onClick={() => handleClick("ㄱ")}>ㄱ</button>
      <button onClick={() => handleClick("ㄲ")}>ㄲ</button>
      <button onClick={() => handleClick("ㄴ")}>ㄴ</button>
      <button onClick={() => handleClick("ㄷ")}>ㄷ</button>
      <button onClick={() => handleClick("ㄸ")}>ㄸ</button>
      <button onClick={() => handleClick("ㄹ")}>ㄹ</button>
      <button onClick={() => handleClick("ㅁ")}>ㅁ</button>
      <button onClick={() => handleClick("ㅂ")}>ㅂ</button>
      <button onClick={() => handleClick("ㅃ")}>ㅃ</button>
      <button onClick={() => handleClick("ㅅ")}>ㅅ</button>
      <button onClick={() => handleClick("ㅆ")}>ㅆ</button>
      <button onClick={() => handleClick("ㅇ")}>ㅇ</button>
      <button onClick={() => handleClick("ㅈ")}>ㅈ</button>
      <button onClick={() => handleClick("ㅉ")}>ㅉ</button>
      <button onClick={() => handleClick("ㅊ")}>ㅊ</button>
      <button onClick={() => handleClick("ㅋ")}>ㅋ</button>
      <button onClick={() => handleClick("ㅌ")}>ㅌ</button>
      <button onClick={() => handleClick("ㅍ")}>ㅍ</button>
      <button onClick={() => handleClick("ㅎ")}>ㅎ</button>

      {/* 한글 모음 버튼들 */}
      <button onClick={() => handleClick("ㅏ")}>ㅏ</button>
      <button onClick={() => handleClick("ㅐ")}>ㅐ</button>
      <button onClick={() => handleClick("ㅑ")}>ㅑ</button>
      <button onClick={() => handleClick("ㅒ")}>ㅒ</button>
      <button onClick={() => handleClick("ㅓ")}>ㅓ</button>
      <button onClick={() => handleClick("ㅔ")}>ㅔ</button>
      <button onClick={() => handleClick("ㅕ")}>ㅕ</button>
      <button onClick={() => handleClick("ㅖ")}>ㅖ</button>
      <button onClick={() => handleClick("ㅗ")}>ㅗ</button>
      <button onClick={() => handleClick("ㅘ")}>ㅘ</button>
      <button onClick={() => handleClick("ㅙ")}>ㅙ</button>
      <button onClick={() => handleClick("ㅚ")}>ㅚ</button>
      <button onClick={() => handleClick("ㅛ")}>ㅛ</button>
      <button onClick={() => handleClick("ㅜ")}>ㅜ</button>
      <button onClick={() => handleClick("ㅝ")}>ㅝ</button>
      <button onClick={() => handleClick("ㅞ")}>ㅞ</button>
      <button onClick={() => handleClick("ㅟ")}>ㅟ</button>
      <button onClick={() => handleClick("ㅠ")}>ㅠ</button>
      <button onClick={() => handleClick("ㅡ")}>ㅡ</button>
      <button onClick={() => handleClick("ㅢ")}>ㅢ</button>
      <button onClick={() => handleClick("ㅣ")}>ㅣ</button>

      {/* 백스페이스 버튼 */}
      <button onClick={handleBackspace}>⌫</button>

      {/* Enter 버튼 */}
      <button onClick={handleEnter}>Enter</button>
    </div>
  );
};

export default Keyboard;
