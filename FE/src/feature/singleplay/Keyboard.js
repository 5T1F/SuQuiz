import React, { useEffect, useState } from "react";

import styles from "./Keyboard.module.css";
import SubdirectoryArrowLeftRoundedIcon from "@mui/icons-material/SubdirectoryArrowLeftRounded";
import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";

const Keyboard = ({ handleEnter, handleBackspace, keyboardMaps, handleKeyPress }) => {
  const [keyboardArrays, setKeyboardArrays] = useState([
    ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅒ", "ㅔ", "ㅖ"],
    ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ", "ㅢ"],
    ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", "ㅟ", "ㅚ"],
  ]);

  // 마운트 시 실행
  useEffect(() => {
    console.log("maps ....", keyboardMaps);
  }, []);

  const renderButtons = (num) => {
    const buttons = [];
    keyboardMaps.forEach((value, key) => {
      if (keyboardArrays[num].includes(key)) {
        buttons.push(
          <button key={key} className={styles[getKeyCSS(value)]} onClick={() => keyClick(key)}>
            {key}
          </button>
        );
      }
    });
    return buttons;
  };

  const getKeyCSS = (status) => {
    if (status === 2) return "keyboardColGreen";
    else if (status === 1) return "keyboardColYellow";
    else return "keyboardColWhite";
  };

  // 버튼 클릭 이벤트 핸들러
  const keyClick = (letter) => {
    handleKeyPress(letter);
  };

  // 엔터를 눌렀을 때 버튼 색상 업데이트 및 이벤트 핸들링
  const clickEnter = () => {
    console.log("enter ...");
    handleEnter();
  };

  return (
    <div className={styles.keyboard}>
      <div className={styles.keyboardRow}>{renderButtons(0)}</div>

      <div className={styles.keyboardRow}>
        {renderButtons(1)}
        <button className={styles.specialKey} onClick={handleBackspace}>
          <BackspaceRoundedIcon />
        </button>
      </div>

      <div className={styles.keyboardRow}>
        {renderButtons(2)}{" "}
        <button className={styles.specialKey} onClick={clickEnter}>
          <SubdirectoryArrowLeftRoundedIcon color="primary" />
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
