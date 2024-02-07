import React, { useState, useEffect } from "react";

import { useAuthStore, useTokenStore } from "../../../app/store";
import ModalModify from "../../auth/modify/ModalModify";

const UserInfo = () => {
  const { userId, setUserId } = useAuthStore();
  const { accessToken, setAccessToken } = useTokenStore();
  const [userInfoData, setUserInfoData] = useState(null);
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/mypage/${userId}`, {
          method: "GET",
          headers: {
            Athorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("서버 응답이 실패했습니다.");
        }

        const data = await response.json();
        setUserInfoData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserInfo();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출

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

  return (
    <>
      {/* 단어사이 간격  space-y-1  */}
      <div className="p-1 space-y-1 border-4 border-orange-500 h-2/3">
        <div>
          <p>{getUserInfo().nickname}</p>
          <button onClick={handleLogout}>로그아웃</button>
          <button onClick={handleModify}>수정</button>
        </div>
        <img src="${getUserInfo().profileImage}" alt="프로필사진" />
        <p>레벨 : {getUserInfo().level}</p>
        <p>경험치 : {getUserInfo().exp}</p>
      </div>

      {/* modalOpen이 true일 때만 모달 렌더링 */}
      {modalOpen && <ModalModify onClose={handleCloseModal} />}
    </>
  );
};

export default UserInfo;
