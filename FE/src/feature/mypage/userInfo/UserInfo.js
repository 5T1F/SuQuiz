import React, { useState, useEffect } from "react";

import ModalModify from "../../auth/modify/ModalModify";

import RecordItem from "../../singleplay/RecordItem";

import { dailyShare, dailyResult, dailyQuest } from "../../../apis/singleplayApi";

import styles from "./UserInfo.module.css";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const UserInfo = () => {
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  const storedAccessToken = localStorage.getItem("tokenStorage");
  const parsedAccessToken = JSON.parse(storedAccessToken);
  const accessToken = parsedAccessToken.state.accessToken;
  const [userInfoData, setUserInfoData] = useState(null);
  const [dailyResultData, setDailyResultData] = useState(null);
  const [dailyShareData, setDailyShareData] = useState(null);
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 유저 정보 조회 -> 되어있음
  // 유저 워들 정보 조회 fetchUserWordleInfo 이것도 싱글플레이 api에서 그대로 가져와도 됨ㅇㅇ
  // sNS 공유할 오늘의 결과 요청 이거는 싱글플레이api에서 그대로 가져와도 됨ㅇㅇ

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/mypage/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("서버 응답이 실패했습니다.");
        }

        const data = await response.json();
        setUserInfoData(data.data);
      } catch (error) {
        console.error("Error fetching UserInfoData:", error);
      }
    };

    const fetchData = async () => {
      try {
        const resultData = await dailyResult(userId);
        setDailyResultData(resultData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserInfo();
    fetchData();
  }, []);

  const getUserInfo = () => {
    return userInfoData != null
      ? userInfoData
      : {
          nickname: "",
          profileImage: "",
          level: 0,
          exp: 0,
        };
  };

  const getDailyResultData = () => {
    return dailyResultData != null
      ? dailyResultData
      : {
          allTrialCount: "", // 전체 도전 횟수
          streak: { LocalData: 0 }, // 스트릭
          solveCount: 0, // 최근 연속 스트릭
          correctCount: 0, // 최근 연속 정답
          maxCorrectCount: 0, // 최장 연속 스트릭
          trialSpread: [0, 0, 0, 0, 0], // 도전 분포
          correctRate: 0, // 정답률
        };
  };

  const getDailyShareData = () => {
    return dailyShareData != null
      ? dailyShareData
      : {
          correct: false,
          trialCount: 0,
          correctCount: 0,
          resultText: "",
        };
  };

  const handleLogout = () => {
    try {
      localStorage.setItem("idStorage", 0);
      localStorage.setItem("tokenStorage", null);
      localStorage.setItem("emailStorage", null);
      localStorage.setItem("nicknameStorage", null);
      localStorage.setItem("providerStorage", null);
      window.location.replace("/");

      alert("로그아웃 완료");
    } catch (error) {
      alert(error);
    }
  };

  const handleModify = () => {
    setModalOpen(true);
  };

  // 함수를 전달하여 모달 닫기
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const UserInfoProgress = ({ level, exp }) => {
    // 경험치를 0에서 100 사이의 값으로 변환하는 로직을 추가해야 합니다.
    // 예를 들어, 만약 exp가 0에서 1000 사이의 값이고, 현재 exp가 500이라면,
    // percentage는 50이 되어야 합니다.
    const percentage = exp; // 이 부분은 실제 exp 값을 퍼센테이지로 변환하는 로직으로 대체해야 합니다.

    return (
      <CircularProgressbarWithChildren
        value={percentage}
        styles={buildStyles({
          // 원형 프로그레스 바의 스타일 커스터마이징
          textColor: "black",
          pathColor: "#F4B28E",
          trailColor: "#bca79d27",
        })}
      >
        {/* 중앙에 표시될 텍스트*/}
        <div style={{ fontSize: "20px", marginTop: "-5px" }}>
          <div>{`Lv.${level}`}</div>
        </div>
        <div style={{ fontSize: "16px" }}>{`Exp ${exp}%`}</div>
      </CircularProgressbarWithChildren>
    );
  };

  return (
    <>
      <div className={styles.userInfoContainer}>
        {/* 유저 닉네임, 로그아웃, 수정 */}
        <div className="h-1/6 flex flex-row justify-between items-center">
          <div className="flex flex-row justify-center items-center">
            {getUserInfo().profileImage ? (
              <img src="${getUserInfo().profileImage}" alt="프로필 이미지" />
            ) : (
              <AccountCircleOutlinedIcon style={{ fontSize: 30 }} />
            )}
            <div className="flex flex-row justify-center items-center w-full text-xl font-bold mx-2">
              {getUserInfo().nickname}
            </div>
            <button className={styles.logoutButton} onClick={handleLogout}>
              로그아웃
            </button>
          </div>
          <div className="flex">
            <button className={styles.modifyButton} onClick={handleModify}>
              <ManageAccountsRoundedIcon />
            </button>
          </div>
        </div>
        {/* 게임 정보 */}
        <div className="h-3/5 flex flex-row justify-between">
          <div className="w-[110px] flex justify-center items-center">
            {/* 레벨, 경험치 프로그래스바 */}
            <UserInfoProgress level={getUserInfo().level} exp={getUserInfo().exp} />
          </div>
          <div className="w-[180px]">
            {/* 통계 */}
            <div className="flex mb-1">
              <RecordItem label="전체도전" value={getDailyResultData().allTrialCount} color="white" />
              <RecordItem label="정답률" value={`${getDailyResultData().correctRate}%`} color="green" />
            </div>
            <div className="flex">
              <RecordItem label={"최근 연속 정답 기록"} value={getDailyResultData().correctCount} color="brown" />
              <RecordItem label={"최장 연속 스트릭"} value={getDailyResultData().maxCorrectCount} color="yellow" />
            </div>
          </div>
        </div>
        <div className="h-1/6">
          {/* 스트릭 */}
          <div className={styles.memo}>{getDailyResultData().solveCount}일 연속 문제를 푸셨어요!</div>
        </div>
      </div>
      {/* modalOpen이 true일 때만 모달 렌더링 */}
      {modalOpen && <ModalModify onClose={handleCloseModal} />}
    </>
  );
};

export default UserInfo;
