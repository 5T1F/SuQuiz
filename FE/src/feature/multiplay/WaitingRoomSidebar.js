import React, { useState, useEffect } from "react";

import FriendList from "../mypage/community/FriendList";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import styles from "./WaitingRoomSidebar.module.css";
import flag from "../../assets/images/flag.png";

const WaitingRoomSidebar = ({ session, isPlaying }) => {
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  const storedAccessToken = localStorage.getItem("tokenStorage");
  const parsedAccessToken = JSON.parse(storedAccessToken);
  const accessToken = parsedAccessToken.state.accessToken;

  const [userInfoData, setUserInfoData] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = () => {
    if (session) {
      session
        .signal({
          data: JSON.stringify({
            message: chatMessage,
            senderNickname: userInfoData.nickname, // 보낸 사람의 닉네임 추가
          }),
          type: "chat-message",
        })
        .then(() => {
          console.log("Message successfully sent");
          setChatMessage(""); // Clear input field after sending message
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  };

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
        console.error("Error fetching data:", error);
      }
    };

    fetchUserInfo();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출

  // 채팅 메시지를 수신할 때마다 실행될 콜백 함수
  useEffect(() => {
    const handleChatMessage = (event) => {
      console.log("Received chat message:", event.data);
      setChatHistory((prevChatHistory) => [...prevChatHistory, JSON.parse(event.data)]);
    };

    if (session) {
      session.on("signal:chat-message", handleChatMessage);
    }

    return () => {
      if (session) {
        session.off("signal:chat-message", handleChatMessage);
      }
    };
  }, [session]);

  const LinearProgressbar = ({ level, exp }) => {
    const maxExp = (level - 1) * 50 + 100;
    const percentage = Math.min(100, (exp / maxExp) * 100); // 현재 경험치를 퍼센트로 변환, 최대 100%

    return (
      <div className="w-full h-4 bg-gray-200 rounded-full">
        <div className="h-4 rounded-full bg-coutom-yellow" style={{ width: `${percentage}%` }}></div>
      </div>
    );
  };

  return (
    <>
      {isPlaying ? (
        <></>
      ) : (
        <>
          {/* 사용자 정보 표시 부분 */}
          <div className={styles.userInfo}>
            <div className="relative w-20 h-24">
              <img src={flag} alt="Flag" className="absolute inset-0 z-10 object-cover w-full h-full" />
              <div className="absolute inset-0 z-20 flex items-center justify-center pb-3">
                <div className="font-bold text-2xl text-[#f4b28e]">Lv.{userInfoData.level}</div>
              </div>
            </div>
            {/* <img src={getUserInfo().profileImage} alt="프로필 이미지" className={styles.profileImage} /> */}
            <div className="w-72">
              <div className="w-full mb-1 text-2xl font-bold">{userInfoData.nickname}</div>
              <div className="text-gray-500">EXP.{userInfoData.exp}</div>
              <div className={styles.progressBar}>
                <LinearProgressbar level={userInfoData.level} exp={userInfoData.exp} />
              </div>
            </div>
          </div>
          {/* 친구한테 초대코드 보내기 위한 컴포넌트 */}
          <FriendList isMultiplay={true} />
        </>
      )}

      {/* 오픈비두로 대기실 내 실시간 채팅 */}
      {/* 채팅 메시지 UI */}
      <div className={styles.chat}>
        <div className={styles.messageSet}>
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={` ${
                message.senderNickname !== userInfoData.nickname ? styles.receivedMessageRow : styles.sentMessageRow
              }`}
            >
              {message.senderNickname !== userInfoData.nickname && (
                <div className={styles.senderNickname}>{message.senderNickname}</div>
              )}
              <div
                className={`${
                  message.senderNickname !== userInfoData.nickname ? styles.receivedMessage : styles.sentMessage
                }`}
              >
                <span className={styles.messageContent}>{message.message}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.chatInputContainer}>
          <input
            className={styles.sendInput}
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                // shift + Enter 키 같이 누르면 줄바꿈
                sendMessage();
                e.preventDefault(); // Enter 키 입력으로 인한 기본 이벤트 방지
              }
            }}
            placeholder="메시지를 입력하세요."
          />
          <button className={styles.sendButton} onClick={sendMessage}>
            <SendRoundedIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default WaitingRoomSidebar;
