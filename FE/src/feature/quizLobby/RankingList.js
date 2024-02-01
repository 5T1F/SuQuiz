import React, { useState, useEffect } from "react";
import styles from "./RankingList.module.css";

const RankingList = () => {
  // 로그인 구현하면 고치기!!!!!*********************************************
  const userId = null;

  const [rankingData, setRankingData] = useState(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/ranking`); // !!!API 경로 채워야 됨!!!
        const data = await response.json();
        if (data.data) {
          setRankingData(data.data);
        } else {
          console.error("Error fetching data:", data.message);
        }
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
        {rankingData ? (
          <>
            <div>
              <h1>userId</h1>
              <h2>My Rank: {rankingData.myRank}</h2>
            </div>
            <div className="flex">
              <p>Nickname</p>
              <p>Level</p>
              <p>Exp</p>
            </div>
            <ul>
              {/* 나중에 key를 index말고 단어의 고유식별자를 key로 사용할 것 */}
              {rankingData.ranking.slice(0, 13).map((entry, index) => (
                <li key={index}>
                  <p>N: {entry.nickname}</p>
                  <p>L: {entry.level}</p>
                  <p>E: {entry.exp}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div>일치하는 결과가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default RankingList;
