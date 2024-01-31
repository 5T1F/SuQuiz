import React, { useEffect } from "react";

const NaverCallback = async (props) => {
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
        //spring에서 발급된 jwt 반환 localStorage 저장
        localStorage.setItem("accessToken", response.headers.accesstoken);

        // //메인 페이지로 이동
        // window.location.href = "/";
        // 아래는 현재 페이지를 새로운 페이지로 덮어 씌우기 때문에 이전 페이지로 이동이 불가능
        // 보안상 아래가 나을듯
        window.location.replace("/");
      })
      .catch((err) => {
        //에러발생 시 경고처리 후 메인페이지로 전환
        alert(err.response.data.detail);
        window.location.href = "/";
      });
  });

  return <></>;
};

export default NaverCallback;
