import React from "react";
import { useLocation } from "react-router-dom";

import Container from "../components/Container";
import Players from "../feature/multiplay/Players";
import Bottombox from "../feature/multiplay/Bottombox";
import Sidebar from "../feature/multiplay/Sidebar";

const WaitingPage = () => {
  // 로그인 구현하면 수정하기!!****************
  const userId = null;

  const location = useLocation();
  const isManager = location.state.manager;
  const enterCode = location.state.enterCode;

  return (
    <Container>
      {isManager ? <p>방장</p> : <p>참가자</p>}
      <h1>WaitingPage</h1>
      <p>isManager: {String(isManager)}</p>
      <div className="flex">
        <div className="w-4/6 h-[90vh] p-1 border-4 border-violet-500">
          <Players isManager={isManager} />
          <Bottombox isManager={isManager} />
        </div>
        <div className="w-2/6 h-[90vh] p-1 border-4 border-red-500">
          <Sidebar isManager={isManager} />
        </div>
      </div>
    </Container>
  );
};

export default WaitingPage;
