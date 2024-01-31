import React, { useState, useEffect } from "react";
import styles from "./SearchFriend.module.css";

const FriendList = ({ data }) => {
  return (
    <>
      {/* 단어사이 간격  space-y-1  */}
      <div className="space-y-1 h-2/3 p-1 border-4 border-orange-500">
        {data == null ? (
          <ul>
            {/* 나중에 key를 index말고 단어의 고유식별자를 key로 사용할 것 */}
            {data.map((friend, index) => (
              <li
                className={`flex items-center justify-center h-8 rounded-lg outline-none bg-yellow-200 shadow`}
                key={index}
              >
                {friend}
              </li>
            ))}
          </ul>
        ) : (
          <div>일치하는 결과가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default FriendList;
