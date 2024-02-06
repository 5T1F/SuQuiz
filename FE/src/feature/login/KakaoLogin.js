import React from "react";

const KakaoLogin = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY; // 발급 받은 REST API KEY
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI; // 작성했던 Callback URL
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return <button onClick={loginKakao}>카카오 로그인</button>;
};

export default KakaoLogin;
