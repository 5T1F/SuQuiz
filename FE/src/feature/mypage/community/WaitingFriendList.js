import React, { useState, useEffect } from "react";

import { useAuthStore, useUserNicknameStore } from "../../../app/store";
import styles from "./WaitingFriendList.module.css";

const WaitingFriendList = () => {
  const { userId, setUserId } = useAuthStore();
  const { userNickname, setUserNickname } = useUserNicknameStore();
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends/request/${userId}`);
        const data = await response.json();

        // 데이터가 배열 형태인지 확인 후 업데이트
        if (Array.isArray(data.data)) {
          setRequestList(data.data);
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
        fromNickname: userNickname,
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
        console.log("Acctepted friend request successfully!");
      } else {
        // 요청이 실패한 경우
        console.error("Failed to accept friend request.");
      }
    } catch (error) {
      // 오류 발생 시
      console.error("Error accepting friend request:", error);
    }
  };

  return (
    <div>
      {requestList.length > 0 ? (
        <ul>
          {requestList.map((friend) => (
            <li className={styles.friendItem} key={friend.nickname}>
              <p className={styles.friendName}>
                <span className={styles.friendNickname}>{friend.nickname}</span> 님의 친구 요청
              </p>
              {/* <p className={styles.friendLevel}>Lv.{friend.level}</p> */}
              <button className={styles.friendButton} onClick={() => handleAccept(friend.nickname)}>
                수락하기
              </button>
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
