import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "react-lottie";

import ModalNoMatchingRoom from "./ModalNoMatchingRoom";

import styles from "./QuizSelect.module.css";
import singleplayImg from "../../assets/images/puzzle_single.png";
import multiplayImg from "../../assets/images/puzzle_multi.png";
import orange_juice_animation from "../../assets/lottie/orange_juice_animation.json";
import lime_juice_animation from "../../assets/lottie/lime_juice_animation.json";

const QuizSelect = () => {
  const storedToken = localStorage.getItem("tokenStorage");
  const parsedToken = JSON.parse(storedToken);
  const accessToken = parsedToken.state.accessToken;
  const [codeValue, setCodeValue] = useState("");
  const navigate = useNavigate();

  // 모달창 노출 여부 state
  const [noMatchingModalOpen, setNoMatchingModalOpen] = useState(false);

  // 싱글플레이 섹션에 호버 상태
  const [isHoveredSingle, setIsHoveredSingle] = useState(false);
  // 멀티플레이 섹션에 호버 상태
  const [isHoveredMulti, setIsHoveredMulti] = useState(false);
  const [isDelayedPlay, setIsDelayedPlay] = useState(false); // 애니메이션 두 개 중에 하나는 지연 시작

  // 함수를 전달하여 클릭 시 모달 열기
  const handleNoMatchingRoom = () => {
    setNoMatchingModalOpen(true);
  };

  // 함수를 전달하여 모달 닫기
  const handleCloseModalNoMatchingRoom = () => {
    setNoMatchingModalOpen(false);
  };

  // 싱글플레이 섹션 클릭 이벤트 핸들러
  const handleSingleplayClick = () => {
    navigate("/singleplay"); // 싱글플레이 페이지로 이동
  };
  const handleMultiplayClick = () => {}; // 멀티플레이 페이지로 이동하는 로직 추가 필요

  const createSession = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/sessions`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const { sessionId, inviteCode, token } = response.data;
      console.log("방만들었을 때 리스폰스");
      console.log(response.data);
      // 방장으로서 세션에 참가
      navigate(`../multiplay/${sessionId}`, {
        state: { sessionId, token, inviteCode, isModerator: true },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const joinSession = async () => {
    // 초대 코드를 사용하여 세션에 참가하는 로직 (API 요청 후 token 받아오기)
    // 이 예시에서는 초대 코드가 세션 ID라고 가정
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/sessions/${codeValue}/token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const { sessionId, token } = response.data;

      console.log(response.data);
      navigate(`../multiplay/${sessionId}`, {
        state: { sessionId, token, inviteCode: codeValue, isModerator: false },
      });
    } catch (error) {
      console.error(error);
      handleNoMatchingRoom();
    }
  };

  // 싱글플레이 섹션에 대한 Lottie 옵션
  const orangeJuiceOptions = {
    loop: true,
    autoplay: false,
    animationData: orange_juice_animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // 멀티플레이 섹션에 대한 Lottie 옵션
  const limeJuiceOptions = {
    loop: true,
    autoplay: false,
    animationData: lime_juice_animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // 멀티플레이에 호버 상태가 변경될 때마다 실행
  useEffect(() => {
    if (isHoveredMulti) {
      // 호버 시작 시 첫 번째 애니메이션 즉시 재생
      setIsDelayedPlay(false); // 첫 번째 애니메이션은 지연 없이 재생

      // 160ms 후 두 번째 애니메이션 재생 시작
      const timer = setTimeout(() => {
        setIsDelayedPlay(true);
      }, 160); // 지연

      return () => clearTimeout(timer);
    } else {
      // 호버가 끝나면 두 애니메이션 모두 정지
      setIsDelayedPlay(false);
    }
  }, [isHoveredMulti]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
        ease: "easeOut",
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: {
        ease: "easeIn",
        duration: 0.3,
      },
    },
  };

  const hoverTransition = {
    scale: {
      duration: 0.3,
      ease: "easeInOut",
    },
    default: {
      ease: "linear",
      duration: 0.3,
    },
  };

  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        {/* 싱글플레이 */}
        <motion.div
          onClick={handleSingleplayClick}
          whileHover={{ scale: 1.25 }}
          transition={hoverTransition}
          onMouseEnter={() => setIsHoveredSingle(true)}
          onMouseLeave={() => setIsHoveredSingle(false)}
          className="w-60 h-auto m-5 p-5 rounded-2xl shadow transition bg-white cursor-pointer flex flex-col items-center"
        >
          <div className="font-semibold text-[36px] leading-[61px] rounded-t-lg text-custom-orange">싱글플레이</div>
          <div className="flex justify-center items-start overflow:hidden">
            <div className="h-60 flex justify-center items-center">
              <Lottie options={orangeJuiceOptions} height={300} isStopped={!isHoveredSingle} />
            </div>
          </div>
        </motion.div>

        {/* 멀티플레이 */}
        <motion.div
          onClick={handleMultiplayClick}
          whileHover={{ scale: 1.05 }}
          transition={hoverTransition}
          onMouseEnter={() => setIsHoveredMulti(true)}
          onMouseLeave={() => setIsHoveredMulti(false)}
          className="w-96 h-auto m-5 p-5 rounded-2xl shadow transition bg-white cursor-pointer flex flex-col items-center"
        >
          <div className="font-semibold text-[36px] leading-[61px] rounded-t-lg text-custom-green">멀티플레이</div>
          {/* 멀티플레이 세부 요소들 */}
          <AnimatePresence>
            {isHoveredMulti && (
              <>
                <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                  <div
                    className={`w-full h-12 p-1 mt-5 mb-2 rounded-xl shadow transition bg-custom-green flex flex-col items-center justify-center`}
                    onClick={createSession}
                  >
                    방 만들기
                  </div>
                  <div
                    className={`w-full h-24 p-1 rounded-xl shadow transition bg-white flex flex-col items-center justify-center`}
                  >
                    <div onClick={joinSession} className="mb-2 flex items-center justify-center">
                      코드로 입장하기
                    </div>
                    <input
                      type="text"
                      placeholder=" 입장 코드를 입력하세요 "
                      value={codeValue}
                      onChange={(e) => setCodeValue(e.target.value)}
                      className="z-50 mx-1 text-center placeholder-gray-400 border-2 rounded-md border-custom-green h-9 cursor-text placeholder-opacity-80"
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <div className="flex justify-center items-start overflow:hidden">
            <div className="h-60 flex justify-center items-center">
              <Lottie options={limeJuiceOptions} height={300} isStopped={!isHoveredMulti} />
            </div>
            <div className="h-60 flex justify-center items-center">
              <Lottie options={limeJuiceOptions} height={300} isStopped={!isHoveredMulti || !isDelayedPlay} />
            </div>
          </div>
        </motion.div>

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
