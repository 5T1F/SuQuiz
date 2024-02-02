import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Bottombox = () => {
  // 로그인 구현하면 수정하기!!****************
  const userId = null;

  const location = useLocation();
  const isManager = location.state.manager;
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  const handleQuizStart = () => {
    setReady(true);
    navigateMultiplay();
  };

  const navigateMultiplay = () => {
    navigate("/multiplay/start");
  };

  return (
    <>
      <div className="flex">
        {isManager ? (
          <>
            <p>방장</p>
            <button onClick={() => handleQuizStart()}>게임 시작</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Bottombox;
