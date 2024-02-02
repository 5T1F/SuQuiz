import React from "react";
import { useLocation } from "react-router-dom";

import Container from "../components/Container";

const WaitingPage = () => {
  // 로그인 구현하면 수정하기!!****************
  const userId = null;
  console.log("멀티");
  const location = useLocation();
  const isManager = location.state.manager;
  const enterCode = location.state.enterCode;

  return (
    <Container>
      {isManager ? <p>방장</p> : <p>참가자</p>}
      <div>
        <h1>WaitingPage</h1>
        <p>isManager: {String(isManager)}</p>
        {/* 참가자들 화면 띄우기 */}
      </div>
    </Container>
  );
};

export default WaitingPage;
