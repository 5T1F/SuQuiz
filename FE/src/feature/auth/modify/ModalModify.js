import React, { useRef, useEffect, useState } from "react";

import { useAuthStore } from "../../../app/store";

import styles from "./ModalModify.module.css";

const Modal = ({ onClose }) => {
  const userId = useAuthStore((state) => state.user);
  const [checkValue, setCheckValue] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(0);
  const modalRef = useRef();

  const handleCheck = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/login/validate/${checkValue}`); // API 경로
      const data = await response.json();
      // 만약 응답이 성공이고, data.data가 존재한다면 그 값을 사용
      if (data.status === "success" && data.data) {
        setIsConfirmed(2);
      } else {
        // 응답이 성공이 아니거나 data.data가 없을 경우에 대한 처리
        setIsConfirmed(1);
        console.error("Error fetching data:", data.message);
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

  return (
    <div ref={modalRef} className={styles.modal} onClick={handleClickInside}>
      <div className={styles.modalContent}>
        <p>회원정보 수정</p>

        <div>
          <p>닉네임 수정</p>
          <form>
            <input
              type="text"
              placeholder="한글만으로 15자 이하"
              value={checkValue}
              onChange={(e) => setCheckValue(e.target.value)}
            ></input>
            <button onClick={handleCheck}>중복검사</button>
          </form>
          {isConfirmed === 2 && <p style="color: blue;">사용 가능한 닉네임입니다.</p>}
          {isConfirmed === 1 && <p style="color: red;">이미 사용 중인 닉네임입니다.</p>}
          <button>탈퇴하기</button>
          <div>
            <button className={styles.close} onClick={onClose}>
              취소
            </button>
            <button className={styles.close} onClick={handleSave}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
