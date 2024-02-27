import React from "react";
import { NaverLoginAPI } from "../../../apis/usersApi";
import naverIcon from "../../../assets/icons/naver-icon.png";

const NaverLogin = () => {
  const loginNaver = () => {
    NaverLoginAPI();
  };

  return (
    <button className="flex items-center justify-center w-full h-full" onClick={loginNaver}>
      <img src={naverIcon} alt="Naver login" />
      네이버 로그인
    </button>
  );
};

export default NaverLogin;
