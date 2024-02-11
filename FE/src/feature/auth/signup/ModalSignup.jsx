import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useAuthStore,
  useUserNicknameStore,
  useTokenStore,
  useUserEmailStore,
  useProviderStore,
} from "../../../app/store";

import styles from "./ModalSignup.module.css";

const Modal = ({ onClose, email }) => {
  const modalRef = useRef();
  const [checkValue, setCheckValue] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(0);
  const { userId, setUserId } = useAuthStore();
  const { userEmail, setUserEmail } = useUserEmailStore();
  const { provider, setProvider } = useProviderStore();
  const { userNickname, setUserNickname } = useUserNicknameStore();
  const { accessToken, setAccessToken } = useTokenStore();
  const navigate = useNavigate();

  const handleCheck = async () => {
    try {
      console.log("중복검사");
      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/login/validate/${checkValue}`); // API 경로
      const data = await response.json();
      // data.data가 true면 사용가능한 닉네임
      if (data.data) {
        setIsConfirmed(2);
      } else {
        setIsConfirmed(1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/login/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          nickname: checkValue,
          provider: provider,
        }),
      }); // API 경로
      const data = await response.json();
      console.log(data);
      // 만약 응답이 성공이고, data.data가 존재한다면 그 값을 사용
      if (data.data) {
        setUserNickname(checkValue);
        localStorage.setItem("emailStorage", null);
        onClose();
        navigate("/");
        alert("회원가입 완료");
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
        <p>회원정보 입력</p>

        <div>
          <p>닉네임 설정</p>
          <input
            type="text"
            placeholder="한글만으로 15자 이하"
            value={checkValue}
            onChange={(e) => setCheckValue(e.target.value)}
          ></input>
          <button onClick={handleCheck}>중복검사</button>
          {isConfirmed === 2 && <p style={{ color: "blue" }}>사용 가능한 닉네임입니다.</p>}
          {isConfirmed === 1 && <p style={{ color: "red" }}>이미 사용 중인 닉네임입니다.</p>}

          <p>SuQuiz 서비스 이용약관에 동의하시면 '저장'을 눌러주세요.</p>
          <div>
            <button
              className={isConfirmed === 2 ? styles.close : styles.disable}
              onClick={isConfirmed === 2 && handleSignup}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
