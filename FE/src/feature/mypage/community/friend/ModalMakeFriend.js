import React, { useRef, useState, useEffect } from "react";

import ModalNoMatchingUser from "./ModalNoMatchingUser";

import styles from "./ModalMakeFriend.module.css";

const Modal = ({ onClose }) => {
  // 로그인 완성 되면 채우기 *************************
  const userId = null; // 친구 요청 목록을 위해
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

  const handleSearch = () => {
    // 여기에서 API 요청을 보내도록 작성
    const requestBody = { search: searchValue };

    fetch(`${process.env.REACT_APP_API_ROOT}/users/friends?search=${searchValue}`, {
      method: "GET",
      body: requestBody,
      // 기타 필요한 설정들 추가
    })
      .then((response) => response.json())
      .then((data) => {
        // 요청에 대한 응답을 처리
        console.log(data);
        handleSendFriendRequest(searchValue);
        onClose();
      })
      .catch((error) => {
        // 경고 모달 띄우고
        handleNoMatchingUser();
        // 요청 모달 닫기
        // onClose(); // 두개 다 닫힘;;;;;
      });
  };

  const handleSendFriendRequest = async (searchValue) => {
    try {
      const requestBody = {
        fromNickname: userId,
        toNickname: searchValue,
      };

      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
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
