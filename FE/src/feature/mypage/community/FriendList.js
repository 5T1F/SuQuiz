import React, { useState, useEffect } from "react";

import ModalMakeFriend from "../friend/ModalMakeFriend";
import SearchFriend from "../friend/SearchFriend";

import styles from "./FriendList.module.css";

const FriendList = () => {
  // 로그인하면 수정!!*********************************************
  const userId = null;
  const [friends, setFriends] = useState([]);
  const [filterFriend, setFilterFriend] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doSearch, setDoSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // 함수를 전달하여 클릭 시 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends/${userId}`); // API 경로
        const data = await response.json();
        // 만약 응답이 성공이고, data.data가 존재한다면 그 값을 사용
        if (data.status === "success" && data.data) {
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
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출

  return (
    <>
      {/* 단어사이 간격  space-y-1  */}
      <div className="space-y-1 h-2/3 p-1 border-4 border-orange-500">
        <button onClick={openModal}>친구추가</button>
        <form>
          <input
            type="text"
            placeholder="친구 닉네임"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
          <button onClick={handleSearchFriend}>검색</button>
        </form>
        <h2>Friends List</h2>
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
              </li>
            ))}
          </ul>
        )}
        {doSearch && <SearchFriend data={filterFriend} />}
      </div>
      {isModalOpen && <ModalMakeFriend onClose={closeModal} />} {/* 모달이 열려 있을 때만 렌더링 */}
    </>
  );
};

export default FriendList;
