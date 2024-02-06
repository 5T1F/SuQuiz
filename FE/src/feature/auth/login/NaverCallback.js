import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuthStore } from "../../../app/store";
import ModalSignup from "../signup/ModalSignup";

const NaverCallback = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const location = useLocation();
  const navigate = useNavigate();
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const fetchNickname = async (email, provider) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/login/checkNickname/${email}/${provider}`); // API 경로
      const data = await response.json();
      // 만약 응답이 성공이고, data.data가 존재한다면 그 값을 사용
      if (data.status === "success" && data.data === false) {
        console.log("여기");
        // 회원가입 모달 띄우자
        setModalOpen(true);
      } else {
        setUser(data.data.nickname);
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOAuthNaver = async (code, state) => {
    try {
      console.log(code);
      console.log(state);
      // 카카오로부터 받아온 code를 서버에 전달하여 카카오로 회원가입 & 로그인한다
      await axios
        .post(`${process.env.REACT_APP_API_ROOT}/users/login/naver`, {
          authorizationCode: code,
          state: state,
        })
        .then((response) => {
          setUserEmail(response.data.data.email);
          console.log(response.data.data.oauthProvider);
          alert("로그인 성공: " + response.data.data.email);
          fetchNickname(response.data.data.email, response.data.data.oauthProvider);

          // //메인 페이지로 이동
          // window.location.href = "/";
          // 아래는 현재 페이지를 새로운 페이지로 덮어 씌우기 때문에 이전 페이지로 이동이 불가능
          // 보안상 아래가 나을듯
          // window.location.replace("/");
        });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (code && state) {
      handleOAuthNaver(code, state);
    }
  }, [location]);

  // 함수를 전달하여 모달 닫기
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div>
        <div>Processing...</div>
      </div>

      {/* modalOpen이 true일 때만 모달 렌더링 */}
      {modalOpen && <ModalSignup onClose={handleCloseModal} email={userEmail} />}
    </>
  );
};

export default NaverCallback;
