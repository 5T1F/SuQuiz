import React, { useState, useEffect } from "react";
import styles from "./FriendList.module.css";

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends/{userId}`); // API 경로
        const data = await response.json();
        setFriends(data.friends);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFriends();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출

  return (
    <>
      {/* 단어사이 간격  space-y-1  */}
      <div className="space-y-1 h-2/3 p-1 border-4 border-orange-500">
        <h2>Friends List</h2>
        <ul>
          {/* 나중에 key를 index말고 단어의 고유식별자를 key로 사용할 것 */}
          {friends.map((friend, index) => (
            <li
              className={`flex items-center justify-center h-8 rounded-lg outline-none bg-yellow-200 shadow`}
              key={index}
            >
              {friend}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FriendList;
