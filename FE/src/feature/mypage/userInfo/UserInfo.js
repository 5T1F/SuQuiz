import React, { useState, useEffect } from "react";

import styles from "./USerInfo.module.css";

const UserInfo = () => {
  // 로그인하면 수정!!*********************************************
  const userId = null;
  const [userInfoData, setUserInfoData] = useState([]);
  const [userProperty, serUserProperty] = useState("");

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
      <div className="space-y-1 h-2/3 p-1 border-4 border-orange-500">
        <ul>
          {/* 나중에 key를 index말고 단어의 고유식별자를 key로 사용할 것 */}
          {userInfoData.map((property, index) => (
            <li
              className={`flex items-center justify-center h-8 rounded-lg outline-none bg-yellow-200 shadow`}
              key={index}
            >
              {index === 1 && <div>{property}</div>}
              {index === 2 && <img src="property" alt="프로필사진" />}
              {index === 3 && <div>레벨 : {property}</div>}
              {index === 4 && <div>경험치 : {property}</div>}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserInfo;
