import React from "react";

const SingleplayModal = ({ result, onClose }) => {
  // 모달 창 내용 수정해야 함
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>게임 결과</h2>
        {result === "win" && <p>축하합니다! 정답을 맞추셨습니다!</p>}
        {result === "lose" && <p>아쉽지만 게임 오버입니다. 정답을 맞추지 못했습니다.</p>}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default SingleplayModal;
