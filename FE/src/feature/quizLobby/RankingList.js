import React, { useState, useEffect } from "react";
import styles from "./RankingList.module.css";

const RankingList = () => {
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;

  const storedToken = localStorage.getItem("tokenStorage");
  const parsedToken = JSON.parse(storedToken);
  const accessToken = parsedToken.state.accessToken;

  const [rankingData, setRankingData] = useState(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/ranking/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }); // API 경로
        const data = await response.json();
        console.log(data);
        // 만약 응답이 성공이면 그 값을 사용
        if (data.status === 200) {
          setRankingData(data.data);
        } else {
          // 응답이 성공이 아니거나 data.data가 없을 경우에 대한 처리
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
            <div className="flex">
              <h1>{userId}</h1>
              <h2>My Rank: {rankingData.myRank}</h2>
            </div>
            {/* 나중에 key를 index말고 단어의 고유식별자를 key로 사용할 것 */}
            <table>
              <thead>
                <tr>
                  <th>닉네임</th>
                  <th>레벨</th>
                  <th>경험치</th>
                </tr>
              </thead>
              <tbody>
                {rankingData.ranking.slice(0, 13).map((user, index) => (
                  <tr key={index}>
                    <td>{user.nickname}</td>
                    <td>{user.level}</td>
                    <td>{user.exp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div>일치하는 결과가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default RankingList;
