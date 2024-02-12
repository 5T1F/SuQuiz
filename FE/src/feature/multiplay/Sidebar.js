import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";

const WaitingRoomSidebar = () => {
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
      {/* 단어사이 간격  space-y-1  */}
      <div className="space-y-1">
        <div>
          <p>Lv. {userInfoData.level}</p>
          <p>{userInfoData.nickname}</p>
        </div>
        <div>
          {/* 오픈비두로 대기실 내 실시간 채팅 */}
          <p>채팅창</p>
          {/* 채팅 메시지 UI */}
          <div>
            <div style={{ height: "200px", overflowY: "scroll" }}>
              {chatHistory.map((message, index) => (
                <div key={index}>
                  {message.senderNickname !== userInfoData.nickname && <div>{message.senderNickname}</div>}
                  <div
                    className={
                      message.senderNickname === userInfoData.nickname ? styles.sentMessage : styles.receivedMessage
                    }
                  >
                    {message.message}
                  </div>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                  e.preventDefault(); // Enter 키 입력으로 인한 기본 이벤트 방지
                }
              }}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingRoomSidebar;
