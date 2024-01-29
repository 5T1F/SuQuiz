import React from "react";

const kakaoLogin = () => {
  // 배포 전에 환경변수로 바꿔주기!
  const REST_API_KEY = "218218ad0178d4a0b76a55ffeb155957"; // 발급 받은 REST API KEY
  const REDIRECT_URI = "http://localhost:3000"; // 작성했던 Callback URL
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return <button onClick={loginKakao}>카카오 로그인</button>;
};

export default kakaoLogin;
