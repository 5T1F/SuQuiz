import React, { useRef, useState, useEffect } from "react";

import { useUserNicknameStore } from "../../../../app/store";
import ModalNoMatchingUser from "./ModalNoMatchingUser";

import styles from "./ModalMakeFriend.module.css";

const Modal = ({ onClose }) => {
  const storedNickname = localStorage.getItem("nicknameStorage");
  const parsedNickname = JSON.parse(storedNickname);
  const userNickname = parsedNickname.state.userNickname;
  const storedToken = localStorage.getItem("tokenStorage");
  const parsedToken = JSON.parse(storedToken);
  const accessToken = parsedToken.state.accessToken;
  const modalRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 함수를 전달하여 클릭 시 모달 열기
  const handleNoMatchingUser = () => {
    setModalOpen(true);
  };

  // 함수를 전달하여 모달 닫기
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClickInside = (event) => {
    event.stopPropagation();
  };

  const handleSearch = async () => {
    // 여기에서 API 요청을 보내도록 작성
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends?search=${searchValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      onClose(); // 요청 보내면 모달 닫기
      const data = await response.json();
      if (data.data === null) {
        handleNoMatchingUser();
      } else {
        handleSendFriendRequest(searchValue);
      }
    } catch (error) {
      // 오류 발생 시
      console.error("Error sending friend request:", error);
    }
  };

  const handleSendFriendRequest = async (searchValue) => {
    try {
      const requestBody = {
        fromNickname: userNickname,
        toNickname: searchValue,
      };

      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });
      console.log(response);
      if (response.status === 200) {
        // 성공적으로 요청이 완료된 경우
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      <div ref={modalRef} className={styles.modal} onClick={handleClickInside}>
        <div className={styles.modalContent}>
          <p>친구 추가</p>
          <div>
            <input
              type="text"
              placeholder="유저 닉네임"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div>
            <button className={styles.close} onClick={onClose}>
              취소
            </button>
            <button onClick={handleSearch}>요청</button>
          </div>
        </div>
      </div>

      {/* modalOpen이 true일 때만 모달 렌더링 */}
      {modalOpen && <ModalNoMatchingUser onClose={handleCloseModal} />}
    </>
  );
};

export default Modal;
