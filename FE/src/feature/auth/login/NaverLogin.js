import React from "react";

const NaverLogin = () => {
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID; // 발급 받은 Client ID
  const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_CALLBACK_URL; // 작성했던 Callback URL
  const STATE = "hLiDdL2uhPtsftcZ";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_url=${NAVER_CALLBACK_URL}`;

  //cors 이슈로 인해 href 방식으로 호출
  const loginNaver = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return <button onClick={loginNaver}>네이버 로그인</button>;
};

export default NaverLogin;
