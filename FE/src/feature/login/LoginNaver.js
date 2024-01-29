import React, { useEffect } from "react";
import { createPath, useNavigate } from "react-router-dom";

const LoginNaver = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // 백엔드로 코드값을 넘겨주는 로직
    // 요청 성공 코드값
    let code = new URL(window.location.href).searchParams.get("code");
    console.log(code);

    // 요청 성공하면 navigate('/main')
  });

  return <></>;
};

export default LoginNaver;
