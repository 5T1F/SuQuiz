import React, { useRef, useState, useEffect } from "react";

import ModalNoMatchingUser from "./ModalNoMatchingUser";

import styles from "./ModalMakeFriend.module.css";

const Modal = ({ onClose }) => {
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
      // 기타 필요한 설정들 추가
    })
      .then((response) => response.json())
      .then((data) => {
        // 요청에 대한 응답을 처리
        console.log(data);
        onClose();
      })
      .catch((error) => {
        // 경고 모달 띄우고
        handleNoMatchingUser();
        // 요청 모달 닫기
        // onClose(); // 두개 다 닫힘;;;;;
      });
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
          <div>친구 추가</div>
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