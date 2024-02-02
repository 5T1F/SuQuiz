import React, { useState, useEffect } from "react";
import FriendList from "./FriendList";
import WaitingFriendList from "./WaitingFriendList";
import Chatting from "./Chatting";

function CustomTab({ selectedMain }) {
  const userId = null; // 로그인이 구현되면 채우기 *************************
  const [activeTab, setActiveTab] = useState("FriendList");

  useEffect(() => {
    if (selectedMain) {
      setActiveTab(selectedMain);
    }
  }, [selectedMain]);

  const handleTabClick = (category) => {
    setActiveTab(category);
  };

  return (
    <>
      <div>
        <button onClick={() => handleTabClick("FriendList")}>친구 목록</button>
        <button onClick={() => handleTabClick("WaitingFriendList")}>대기 중인 친구 목록</button>
        <button onClick={() => handleTabClick("Chatting")}>채팅</button>
      </div>
      {activeTab === "FriendList" && <FriendList />}
      {activeTab === "WaitingFriendList" && <WaitingFriendList userId={userId} />}
      {activeTab === "Chatting" && <Chatting />}
      {/* 채팅 탭으로 바꿀 때 최근 채팅했던 친구를 넘겨줘야 됨 */}
    </>
  );
}

export default CustomTab;
