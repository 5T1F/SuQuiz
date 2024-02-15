import React, { useRef, useState, useEffect } from "react";

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
  const [isConfirmed, setIsConfirmed] = useState(0);

  const handleClickInside = (event) => {
    event.stopPropagation();
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends?search=${searchValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.data === null) {
        setIsConfirmed(3);
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
        onClose();
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className={styles.modalBackground}>
        <div ref={modalRef} className={styles.modal} onClick={handleClickInside}>
          <div className={styles.modalTitle}>
            <div>친구 추가</div>
            <span className={styles.close} onClick={onClose}>
              &times;
            </span>
          </div>
          <div className={styles.modalContent}>
            <div style={{ height: "7vh" }}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="유저 닉네임"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {isConfirmed === 3 && <p style={{ color: "red", fontSize: "12px" }}>존재하지 않는 유저입니다.</p>}
            </div>
            <div className={styles.btns}>
              <button className={styles.cancelBtn} onClick={onClose}>
                취소
              </button>
              <button className={styles.requestBtn} onClick={handleSearch}>
                요청
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
