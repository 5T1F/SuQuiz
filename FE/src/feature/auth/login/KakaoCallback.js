import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  useAuthStore,
  useUserNicknameStore,
  useUserEmailStore,
  useProviderStore,
  useTokenStore,
} from "../../../app/store";
import ModalSignup from "../signup/ModalSignup";

const KakaoCallback = () => {
  const { userId, setUserId } = useAuthStore();
  const { userNickname, setUserNickname } = useUserNicknameStore();
  const { userEmail, setUserEmail } = useUserEmailStore();
  const { provider, setProvider } = useProviderStore();
  const { accessToken, setAccessToken } = useTokenStore();
  const location = useLocation();
  const navigate = useNavigate();
  // 모달창 노출 여부 state
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // 함수를 전달하여 모달 닫기
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fetchNickname = async (email, provider) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/login/checkNickname/${email}/${provider}`); // API 경로
      const data = await response.json();
      console.log(data);
      // 만약 응답이 성공이고, data.data가 존재한다면 그 값을 사용
      if (data.data) {
        setUserNickname(data.data.nickname);
        navigate("/");
      } else {
        // 회원가입 모달 띄우자
        handleOpenModal();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOAuthKakao = async (code) => {
    try {
      console.log(code);
      // 카카오로부터 받아온 code를 서버에 전달하여 카카오로 회원가입 & 로그인한다
      const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/users/login/kakao`, {
        authorizationCode: code,
      });
      console.log(response.data);
      setUserId(response.data.data.userId);
      setUserEmail(response.data.data.email);
      setProvider(response.data.data.oauthProvider);
      setAccessToken(response.data.data.authTokens.accessToken);
      await fetchNickname(response.data.data.email, response.data.data.oauthProvider);

      // //메인 페이지로 이동
      // window.location.href = "/";
      // 아래는 현재 페이지를 새로운 페이지로 덮어 씌우기 때문에 이전 페이지로 이동이 불가능
      // 보안상 아래가 나을듯
      // window.location.replace("/");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code"); // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
    if (code) {
      handleOAuthKakao(code);
    }
  }, [location]);

  return (
    <>
      <div>
        <div>Processing...</div>
      </div>

      {/* openModal이 true일 때만 모달 렌더링 */}
      {openModal && <ModalSignup onClose={handleCloseModal} email={userEmail} />}
    </>
  );
};

export default KakaoCallback;
