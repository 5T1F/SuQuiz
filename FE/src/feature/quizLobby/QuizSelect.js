import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./QuizSelect.module.css";

const QuizSelect = () => {
  // 로그인 구현하면 수정!!**************************
  const userId = null;
  const [codeValue, setCodeValue] = useState("");

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const navigateMultiplay = (isManager) => {
    if (isManager) {
      fetch(`${process.env.REACT_APP_API_ROOT}/quizrooms/${userId}`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          setCodeValue(data);
        })
        .catch((error) => {
          // 오류 발생 시
          console.error("Error making quiz room request:", error);
        });
    } else {
      fetch(`${process.env.REACT_APP_API_ROOT}/quizrooms/isFull/${codeValue}`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === "true") {
            // 퀴즈룸 입장
            fetch(`${process.env.REACT_APP_API_ROOT}/quizrooms/enter/${codeValue}`, {
              method: "POST",
            })
              .then((response) => response.json())
              .then((data) => {
                if (data === "true") {
                  // 퀴즈룸 입장
                } else {
                  // 만석으로 입장 불가 모달
                }
              })
              .catch((error) => {
                // 오류 발생 시
                console.error("Error making quiz room request:", error);
              });
          } else {
            // 만석으로 입장 불가 모달
          }
        })
        .catch((error) => {
          // 오류 발생 시
          console.error("Error making quiz room request:", error);
        });
    }
    navigate("/multiplay", {
      state: {
        manager: isManager,
        enterCode: codeValue,
      },
    });
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
              <div className={`h-15 p-1 border-4 border-blue-500`} onClick={() => navigateMultiplay(true)}>
                방 만들기
              </div>
              <div className={`h-15 p-1 border-4 border-green-500`}>
                <div onClick={() => navigateMultiplay(false)}>코드로 입장하기</div>
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
    </>
  );
};

export default QuizSelect;
