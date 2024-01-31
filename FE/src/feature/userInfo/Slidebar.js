import React, { useState } from "react";

import ModalMakeFriend from "./makeFriend/ModalMakeFriend";
import FriendList from "./friendList/FriendList";
import SearchFriend from "./friendList/SearchFriend";

import styles from "./Slidebar.module.css"; // 스타일 파일을 import

const Slidebar = ({ onClose }) => {
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

  const handleCloseSlidebar = () => {
    onClose(); // 버튼 클릭 시 사이드바 닫기
  };

  return (
    <>
      <div className={styles.slidebar}>
        <button className={styles.close} onClick={handleCloseSlidebar}>
          〈
        </button>
        <div>유저 정보</div>
        {/* 함수로 친구목록 / 채팅 번갈아 나오도록 처리 */}
        <div>
          <p>친구</p>
          <button onClick={openModal}>친구추가</button>
          <input
            type="text"
            placeholder="친구 닉네임"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
          <button onClick={handleSearchFriend}>검색</button>
          {!doSearch && <FriendList />}
          {doSearch && <SearchFriend data={friendListData} />}
        </div>
        <div>채팅</div>
      </div>
      {isModalOpen && <ModalMakeFriend onClose={closeModal} />} {/* 모달이 열려 있을 때만 렌더링 */}
    </>
  );
};

export default Slidebar;
