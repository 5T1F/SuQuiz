import React, { useState, useEffect } from "react";

import ModalModify from "../../auth/modify/ModalModify";

const UserInfo = () => {
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  const storedAccessToken = localStorage.getItem("tokenStorage");
  const parsedAccessToken = JSON.parse(storedAccessToken);
  const accessToken = parsedAccessToken.state.accessToken;
  const [userInfoData, setUserInfoData] = useState(null);
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/mypage/${userId}`, {
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

  // const UserInfoProgress = ({ level, exp }) => {
  //   // 경험치를 0에서 100 사이의 값으로 변환하는 로직을 추가해야 합니다.
  //   // 예를 들어, 만약 exp가 0에서 1000 사이의 값이고, 현재 exp가 500이라면,
  //   // percentage는 50이 되어야 합니다.
  //   const percentage = exp; // 이 부분은 실제 exp 값을 퍼센테이지로 변환하는 로직으로 대체해야 합니다.

  //   return (
  //     <CircularProgressbarWithChildren
  //       value={percentage}
  //       styles={buildStyles({
  //         // 원형 프로그레스 바의 스타일 커스터마이징
  //         textColor: "black",
  //         pathColor: "#F4B28E",
  //         trailColor: "grey",
  //       })}
  //     >
  //       {/* 중앙에 표시될 텍스트*/}
  //       <div style={{ fontSize: "20px", marginTop: "-5px" }}>
  //         <div>{`Lv.${level}`}</div>
  //       </div>
  //       <div style={{ fontSize: "16px" }}>{`Exp ${exp}%`}</div>
  //     </CircularProgressbarWithChildren>
  //   );
  // };
  // 이런식으로 사용
  // <UserInfoProgress level={getUserInfo().level} exp={getUserInfo().exp} />

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
