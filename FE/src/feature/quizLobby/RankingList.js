import React, { useState, useEffect } from "react";
import styles from "./RankingList.module.css";

const RankingList = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}`); // !!!API 경로 채워야 됨!!!
        const data = await response.json();
        setRanking(data.nickname);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRanking();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출

  return (
    <>
      {/* 단어사이 간격  space-y-1  */}
      <div className="space-y-1">
        <h2>Ranking</h2>
        <ul>
          {/* 나중에 key를 index말고 단어의 고유식별자를 key로 사용할 것 */}
          {ranking.map((nickname, index) => (
            <li
              className="flex items-center justify-center h-8 rounded-lg outline-none bg-yellow-200 shadow"
              key={index}
            >
              {nickname}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RankingList;
