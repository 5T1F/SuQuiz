import React from "react";
import { KakaoLoginAPI } from "../../../apis/usersApi";
import kakaoIcon from "../../../assets/icons/kakao-icon.png";

const KakaoLogin = () => {
  const loginKakao = () => {
    KakaoLoginAPI();
  };

  return (
    <button className="flex items-center justify-center w-full h-full" onClick={loginKakao}>
      <img src={kakaoIcon} alt="Kakao login" />
      카카오 로그인
    </button>
  );
};

export default KakaoLogin;
