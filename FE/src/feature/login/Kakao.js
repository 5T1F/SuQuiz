import React from "react";

const Kakao = () => {
  const REST_API_KEY = "a77dfde13a1ab0ac43571e47fe823808"; // 발급 받은 REST API KEY
  const REDIRECT_URI = "http://localhost:3000/login"; // 작성했던 Callback URL
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return <button onClick={kakaoLogin}>카카오 로그인</button>;
};

export default Kakao;
