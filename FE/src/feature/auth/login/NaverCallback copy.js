import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuthStore } from "../../../app/store";
import ModalSignup from "../signup/ModalSignup";

const NaverCallback = async (props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState(null);

  await useEffect(() => {
    // 백엔드로 코드값을 넘겨주는 로직
    // 요청 성공 코드값
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");
    console.log(code);
    console.log(state);

    axios
      .post(`${process.env.REACT_APP_API_ROOT}/users/login/naver`, {
        authorizationCode: code,
        state: state,
      })
      .then((response) => {
        setEmail(response.data.email);

        fetchNickname(email);

        // //메인 페이지로 이동
        // window.location.href = "/";
        // 아래는 현재 페이지를 새로운 페이지로 덮어 씌우기 때문에 이전 페이지로 이동이 불가능
        // 보안상 아래가 나을듯
        window.location.replace("/");
        console.log("네이버 로그인 완료");
      })
      .catch((err) => {
        //에러발생 시 경고처리 후 메인페이지로 전환
        alert(err.response.data.detail);
        console.log("네이버 로그인 오류");
      });
  });

  const fetchNickname = async (email) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/login/checkNickname/${email}`); // API 경로
      const data = await response.json();
      // 만약 응답이 성공이고, data.data가 존재한다면 그 값을 사용
      if (data.status === "success" && data.data) {
        setUser(data.data.nickname);
        navigate("/");
      } else {
        // 회원가입 모달 띄우자
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
      {modalOpen && <ModalSignup onClose={handleCloseModal} email={email} />}
    </>
  );
};

export default NaverCallback;
