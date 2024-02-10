import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useTokenStore } from "../../app/store";
import ModalNoMatchingRoom from "./ModalNoMatchingRoom";

import styles from "./QuizSelect.module.css";

const QuizSelect = () => {
  const storedToken = localStorage.getItem("tokenStorage");
  const parsedToken = JSON.parse(storedToken);
  const accessToken = parsedToken.state.accessToken;
  const [codeValue, setCodeValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // 모달창 노출 여부 state
  const [noMatchingModalOpen, setNoMatchingModalOpen] = useState(false);

  // 함수를 전달하여 클릭 시 모달 열기
  const handleNoMatchingRoom = () => {
    setNoMatchingModalOpen(true);
  };

  // 함수를 전달하여 모달 닫기
  const handleCloseModalNoMatchingRoom = () => {
    setNoMatchingModalOpen(false);
  };

  const createSession = async () => {
    try {
      const response = await axios.post(
        `/sessions`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const { sessionId, token } = response.data;
      // 방장으로서 세션에 참가
      navigate(`/multiplay/waiting-room/${sessionId}`, { token, isModerator: true });
    } catch (error) {
      console.error(error);
    }
  };

  const joinSession = async () => {
    // 초대 코드를 사용하여 세션에 참가하는 로직 (API 요청 후 token 받아오기)
    // 이 예시에서는 초대 코드가 세션 ID라고 가정
    try {
      const response = await axios.post(
        `/sessions/${codeValue}/token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const { token } = response.data;
      navigate(`/multiplay/waiting-room/${codeValue}`, { token, isModerator: false });
    } catch (error) {
      console.error(error);
      handleNoMatchingRoom();
    }
  };

  return (
    <>
      <div className="flex">
        <Link to="/singleplay">
          <div className="h-40 p-1 border-4 border-yellow-500">싱글플레이</div>
        </Link>
        <div
          className={`h-40 p-1 border-4 border-gray-500`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div>멀티플레이</div>
          {isHovered ? (
            <>
              <div className={`h-15 p-1 border-4 border-blue-500`} onClick={createSession}>
                방 만들기
              </div>
              <div className={`h-15 p-1 border-4 border-green-500`}>
                <div onClick={joinSession}>코드로 입장하기</div>
                <input
                  type="text"
                  placeholder="입장 코드를 입력하세요"
                  value={codeValue}
                  onChange={(e) => setCodeValue(e.target.value)}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        {/*<div className="w-1/6 p-1 border-4 border-pink-500">
          <Link to="/tutorial">
            <button>튜토리얼</button>
          </Link>
        </div>*/}
      </div>

      {/* modalOpen이 true일 때만 모달 렌더링 */}
      {noMatchingModalOpen && <ModalNoMatchingRoom onClose={handleCloseModalNoMatchingRoom} />}
    </>
  );
};

export default QuizSelect;
