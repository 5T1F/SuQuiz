import React, { useState, useEffect } from "react";

import ModalMakeFriend from "./friend/ModalMakeFriend";
import ModalEndFriendship from "./friend/ModalEndFriendship";
import Chatting from "../community/Chatting";

import styles from "./FriendList.module.css";

const FriendList = ({ isMultiplay }) => {
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  const storedToken = localStorage.getItem("tokenStorage");
  const parsedToken = JSON.parse(storedToken);
  const accessToken = parsedToken.state.accessToken;
  const [friends, setFriends] = useState([]);
  const [filterFriend, setFilterFriend] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [endModalOpen, setEndModalOpen] = useState(false);
  const [doSearch, setDoSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [toNickname, setToNickname] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);

  // 함수를 전달하여 클릭 시 모달 열기
  const openMakeModal = () => {
    setIsModalOpen(true);
  };

  const closeMakeModal = () => {
    setIsModalOpen(false);
  };

  // 함수를 전달하여 클릭 시 모달 열기
  const openEndModal = (friendNickname) => {
    setToNickname(friendNickname);
    setEndModalOpen(true);
  };

  const closeEndModal = () => {
    setEndModalOpen(false);
  };

  const closeChatting = () => {
    setSelectedFriend(null);
  };

  const handleChatButtonClick = (friend) => {
    setSelectedFriend(friend);
  };

  const handleSearchFriend = () => {
    // friends 리스트에서 searchValue를 포함하는 객체들을 filterFriend 리스트에 필터링하여 담는 부분
    const filteredFriends = friends.filter((friend) => friend.nickname.includes(searchValue));
    setFilterFriend(filteredFriends);

    setDoSearch(true);
  };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(`/users/friends/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }); // API 경로
        const data = await response.json();
        console.log(data);
        // 만약 응답이 성공이고, data.data가 존재한다면 그 값을 사용
        if (data.status === 200 && data.data) {
          setFriends(data.data);
        } else {
          // 응답이 성공이 아니거나 data.data가 없을 경우에 대한 처리
          console.error("Error fetching data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFriends();
  }, [endModalOpen]); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출

  return (
    <>
      <div className="p-1 space-y-1 border-4 border-blue-500 h-full">
        {selectedFriend === null ? (
          <>
            {isMultiplay ? (
              <></>
            ) : (
              <>
                <button onClick={openMakeModal}>친구추가</button>

                <input
                  type="text"
                  placeholder="친구 닉네임"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                ></input>
                <button onClick={handleSearchFriend}>검색</button>
              </>
            )}
            <div className="p-1 space-y-1 border-4 border-orange-500 h-full">
              <h2>Friends List()</h2>
              {!doSearch && (
                <ul>
                  {/* 나중에 key를 index말고 단어의 고유식별자를 key로 사용할 것 */}
                  {friends.map((friend, index) => (
                    <li
                      className={`flex items-center justify-center h-8 rounded-lg outline-none bg-yellow-200 shadow`}
                      key={index}
                    >
                      <p>Nickname: {friend.nickname}</p>
                      <p>Level: {friend.level}</p>
                      <button onClick={() => handleChatButtonClick(friend)}>채팅</button>
                      <button onClick={() => openEndModal(friend.nickname)}>&times;</button>
                    </li>
                  ))}
                </ul>
              )}
              {doSearch && (
                <ul>
                  {/* 나중에 key를 index말고 단어의 고유식별자를 key로 사용할 것 */}
                  {filterFriend.map((friend, index) => (
                    <li
                      className={`flex items-center justify-center h-8 rounded-lg outline-none bg-yellow-200 shadow`}
                      key={index}
                    >
                      <p>Nickname: {friend.nickname}</p>
                      <p>Level: {friend.level}</p>
                      <button onClick={() => handleChatButtonClick(friend)}>채팅</button>
                      <button onClick={() => openEndModal(friend.nickname)}>&times;</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          <Chatting
            friendId={selectedFriend.friendId}
            userId={userId}
            friendNickname={selectedFriend.nickname}
            onClose={closeChatting}
          />
        )}
        {isModalOpen && <ModalMakeFriend onClose={closeMakeModal} />} {/* 모달이 열려 있을 때만 렌더링 */}
        {endModalOpen && <ModalEndFriendship onClose={closeEndModal} friendNickname={toNickname} />}{" "}
        {/* 모달이 열려 있을 때만 렌더링 */}
      </div>
    </>
  );
};

export default FriendList;
