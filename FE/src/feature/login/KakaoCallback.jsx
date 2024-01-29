import React, { useEffect } from "react";

const KakaoCallback = async () => {
  await useEffect(() => {
    // 최초 렌더링 시 발동
    // 백엔드로 코드값을 넘겨주는 로직
    // 요청 성공 코드값
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);

    // spring 서버로 인증키를 통해 유저정보를 획득하고 로그인 처리 요청
    axios
      .post("/users/login/kakao", {
        authorizationCode: code,
      })
      .then((response) => {
        //spring에서 발급된 jwt 반환 localStorage 저장
        localStorage.setItem("accessToken", response.headers.accesstoken);

        //메인 페이지로 이동
        window.location.href = "/";
      })
      .catch((err) => {
        //에러발생 시 경고처리 후 메인페이지로 전환
        alert(err.response.data.detail);
        window.location.href = "/";
        // 아래는 현재 페이지를 새로운 페이지로 덮어 씌우기 때문에 이전 페이지로 이동이 불가능
        // 보안상 아래가 나을듯
        // window.location.replace('/');
      });
  });

  return <></>;
};

export default KakaoCallback;
