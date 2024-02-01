import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./QuizSelect.module.css";

const QuizSelect = () => {
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
      <div className="flex">
        <div className="w-1/6 p-1 border-4 border-yellow-500">
          <Link to="/singleplay">
            <button>싱글플레이</button>
          </Link>
        </div>
        <div className="w-1/6 p-1 border-4 border-gray-500">
          <Link to="/multiplay">
            <button>멀티플레이</button>
          </Link>
        </div>
        {/*<div className="w-1/6 p-1 border-4 border-pink-500">
          <Link to="/tutorial">
            <button>튜토리얼</button>
          </Link>
        </div>*/}
      </div>
    </>
  );
};

export default QuizSelect;
