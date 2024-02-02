import React from "react";
import { useLocation } from "react-router-dom";

import Container from "../components/Container";

const MultiplayPage = () => {
  console.log("멀티");
  const location = useLocation();
  const manager = location.state.manager;

  return (
    <Container>
      {manager ? <p>방장</p> : <p>참가자</p>}
      <div>
        <h1>Multiplay Page</h1>
        <p>isManager: {String(manager)}</p>
        {/* 이하 나머지 컴포넌트들을 구성하세요 */}
      </div>
    </Container>
  );
};

export default MultiplayPage;
