import React from "react";

const Naver = () => {
  const NAVER_CLIENT_ID = "P_LIzqGM9aUsN8YUcWoY"; // 발급 받은 Client ID
  const NAVER_CALLBACK_URL = "http://localhost:3000/login"; // 작성했던 Callback URL
  const STATE = "false";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_url=${NAVER_CALLBACK_URL}`;

  const NaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return <button onClick={NaverLogin}>네이버 로그인</button>;
};

export default Naver;
