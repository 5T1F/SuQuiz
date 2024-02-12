import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Modal from "react-modal";

// Chatting 컴포넌트 정의
const Chatting = ({ userId, friendId, friendNickname, onClose }) => {
  const [messages, setMessages] = useState([]); // 메시지 목록 상태
  const [newMessage, setNewMessage] = useState(""); // 새 메시지 입력 상태
  const [stompClient, setStompClient] = useState(null); // Stomp 클라이언트 상태

  // 웹소켓 연결 및 메시지 구독
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/api/ws");
    const client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        console.log("Connected to WS");
        setStompClient(client);

        // 연결 성공 후에 메시지 수신을 위한 구독(subscription) 설정
        client.subscribe(`/user/${userId}/queue/messages`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log("Received message", receivedMessage);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });

        // 컴포넌트 언마운트 시 구독 해제
        return () => {
          console.log("Unsubscribed from WS");
        };
      },
      (error) => {
        console.error("Connection error: ", error);
      }
    );

    return () => {
      if (client) {
        client.disconnect();
        console.log("Disconnected from WS");
      }
    };
  }, [userId]);

  // 이전 메시지 불러오기
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ROOT}/api/messages/history/${userId}/${friendId}`)
      .then((response) => response.json())
      .then((data) => setMessages(data.data))
      .catch((error) => console.error("Failed to fetch messages:", error));
  }, [userId, friendId]);

  // 메시지 전송 핸들러
  const sendMessage = () => {
    if (stompClient && newMessage.trim() !== "") {
      const message = {
        senderId: userId,
        receiverId: friendId,
        content: newMessage,
        timestamp: new Date(),
        isRead: false,
      };
      stompClient.send(`/app/chat/send/${userId}/${friendId}`, {}, JSON.stringify(message));
      setMessages((prevMessages) => [...prevMessages, message]); // 보낸 메시지를 즉시 화면에 표시
      setNewMessage(""); // 입력 필드 초기화
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <button onClick={handleClose}>나가기</button>
      <h2>Chat with {friendNickname}</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.senderId === userId ? (
              <>
                <strong>나:</strong>
              </>
            ) : (
              <>
                <strong>{friendNickname}:</strong>
              </>
            )}
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
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
  );
};

export default Chatting;
