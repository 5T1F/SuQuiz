import React, { useState, useEffect } from "react";

import styles from "./WaitingFriendList.module.css";

const WaitingFriendList = ({ userId }) => {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends/request/${userId}`);
        const data = await response.json();

        // 데이터가 배열 형태인지 확인 후 업데이트
        if (Array.isArray(data)) {
          setRequestList(data);
        }
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    fetchFriendRequests();
  }, [userId]);

  const handleAccept = async (waitingFriend) => {
    try {
      const requestBody = {
        fromNickname: userId,
        toNickname: waitingFriend,
      };

      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // 성공적으로 요청이 완료된 경우, requestList 상태를 갱신
        setRequestList((prevList) => prevList.filter((friend) => friend.nickname !== waitingFriend));
        console.log("Friend request sent successfully!");
      } else {
        // 요청이 실패한 경우
        console.error("Failed to send friend request.");
      }
    } catch (error) {
      // 오류 발생 시
      console.error("Error sending friend request:", error);
    }
  };

  return (
    <div>
      <h3>친구 요청 목록</h3>
      {requestList.length > 0 ? (
        <ul>
          {requestList.map((friend, index) => (
            <li key={index}>
              <p>Nickname: {friend.nickname}</p>
              <p>Level: {friend.level}</p>
              <button onClick={handleAccept(friend.nickname)}>수락</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>친구 요청이 없습니다.</div>
      )}
    </div>
  );
};

export default WaitingFriendList;
