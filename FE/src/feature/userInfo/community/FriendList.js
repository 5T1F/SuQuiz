import React, { useState, useEffect } from "react";

import ModalMakeFriend from "../friend/ModalMakeFriend";
import SearchFriend from "../friend/SearchFriend";

import styles from "./FriendList.module.css";

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doSearch, setDoSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [friendListData, setFriendListData] = useState([]); // FriendList에 전달할 데이터 상태

  // 함수를 전달하여 클릭 시 검색하기
  const handleSearchFriend = () => {
    setDoSearch(true);
    // 여기에서 API 요청을 보내도록 작성
    const requestBody = { search: searchValue };

    fetch(`${process.env.REACT_APP_API_ROOT}/users/friends/{userId}?nickname=${searchValue}`, {
      method: "GET",
      body: requestBody,
      // 기타 필요한 설정들 추가
    })
      .then((response) => response.json())
      .then((data) => {
        // 요청에 대한 응답을 처리
        console.log(data);
        // API 응답을 받아서 friendListData 상태를 업데이트
        setFriendListData(data.friends);
      })
      .catch((error) => {
        // 친구 없을 때
        console.error("Error fetching data:", error);
      });
  };

  // 함수를 전달하여 클릭 시 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        <button onClick={openModal}>친구추가</button>
        <input
          type="text"
          placeholder="친구 닉네임"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>
        <button onClick={handleSearchFriend}>검색</button>
        <h2>Friends List</h2>
        {!doSearch && (
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
        )}
        {doSearch && <SearchFriend data={friendListData} />}
      </div>
      {isModalOpen && <ModalMakeFriend onClose={closeModal} />} {/* 모달이 열려 있을 때만 렌더링 */}
    </>
  );
};

export default FriendList;
