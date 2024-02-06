import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";

const WaitingRoomSidebar = () => {
  // 로그인 구현하면 고치기!!!!!*********************************************
  const userId = null;

  const [userInfoData, setUserInfoData] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/mypage/${userId}`, {
          method: "GET",
        });
        const data = await response.json();
        setUserInfoData(data);
        console.log(data);
      } catch (error) {
        // 친구 없을 때
        console.error("Error fetching data:", error);
      }
    };

    fetchUserInfo();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출

  return (
    <>
      {/* 단어사이 간격  space-y-1  */}
      <div className="space-y-1">
        <div>
          <p>{userInfoData.level}</p>
          <p>{userInfoData.nickname}</p>
        </div>
        {/* 오픈비두로 대기실 내 실시간 채팅 */}
      </div>
    </>
  );
};

export default WaitingRoomSidebar;
