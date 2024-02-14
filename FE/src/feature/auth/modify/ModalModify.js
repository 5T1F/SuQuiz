import React, { useRef, useEffect, useState } from "react";

import { useAuthStore } from "../../../app/store";

import styles from "./ModalModify.module.css";

const Modal = ({ onClose }) => {
  const { userId, setUserId } = useAuthStore();
  const [checkValue, setCheckValue] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(null);
  const modalRef = useRef();

  const checkCondition = (value) => {
    // 정규식을 사용하여 주어진 문자열이 한글로만 이루어져 있는지 확인
    const koreanRegex = /^[가-힣]+$/;

    // 주어진 문자열이 한글로만 이루어져 있고, 길이가 15 이하일 경우 true를 반환
    return koreanRegex.test(value) && value.length <= 15;
  };

  const handleCheck = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/login/validate/${checkValue}`); // API 경로
      const data = await response.json();
      // 만약 응답이 성공이고, data.data가 존재한다면 그 값을 사용
      if (data.data) {
        if (checkCondition(checkValue)) {
          setIsConfirmed(2);
        } else {
          setIsConfirmed(3);
        }
      } else {
        setIsConfirmed(1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/mypage/modify`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          modifiedName: checkValue,
        }),
      }); // API 경로
      const data = await response.json();
      // 만약 응답이 성공이고, data.data가 존재한다면 그 값을 사용
      if (data.status === "success" && data.data) {
        console.log("회원정보 수정 완료");
      } else {
        // 응답이 성공이 아니거나 data.data가 없을 경우에 대한 처리
        console.error("Error fetching data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClickInside = (event) => {
    // 모달 내부를 클릭한 경우 이벤트 전파를 중지시킴
    event.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCheck();
    }
  };

  return (
    <div className={styles.modalBackground}>
      <div ref={modalRef} className={styles.modal} onClick={handleClickInside}>
        <div className={styles.modalTitle}>
          <div>회원 정보 수정</div>
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
        </div>
        <div className={styles.modalContent}>
          <p>닉네임 수정하기</p>
          <div style={{ height: "7vh" }}>
            {" "}
            <input
              className={styles.searchInput}
              type="text"
              placeholder="15자 이하의 한글"
              value={checkValue}
              onChange={(e) => setCheckValue(e.target.value)}
              onKeyPress={handleKeyPress}
            ></input>
            <button className={styles.cancelBtn} onClick={handleCheck}>
              중복검사
            </button>
            {isConfirmed === 2 && <p style={{ color: "blue", fontSize: "xx-small" }}>사용 가능한 닉네임입니다.</p>}
            {isConfirmed === 1 && <p style={{ color: "red", fontSize: "xx-small" }}>이미 사용 중인 닉네임입니다.</p>}
            {isConfirmed === 3 && <p style={{ color: "red", fontSize: "xx-small" }}>부적합한 닉네임입니다.</p>}
          </div>
          <p>탈퇴하기</p>
          <div className={styles.btns}>
            <button className={styles.cancelBtn} onClick={onClose}>
              취소
            </button>
            <form>
              <button className={styles.requestBtn} onClick={handleSave}>
                저장
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
