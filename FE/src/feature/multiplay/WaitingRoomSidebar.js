import React, { useState, useEffect } from "react";

import { userInfo } from "../../apis/mypageApi";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import styles from "./WaitingRoomSidebar.module.css";

const WaitingRoomSidebar = ({ session, isPlaying }) => {
  const storedId = sessionStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  const storedAccessToken = sessionStorage.getItem("tokenStorage");
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
        const data = await userInfo(userId);
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

  return (
    <>
      {/* 오픈비두로 대기실 내 실시간 채팅 */}
      <div className={`${isPlaying ? styles.bottombar : styles.sidebar}`}>
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
