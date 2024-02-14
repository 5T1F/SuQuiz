import React, { useState, useEffect } from "react";
import UserVideoComponent from "./openvidu/UserVideoComponent";
import styles from "./Players.module.css";

const Players = ({ publisher, subscribers, solver }) => {
  const storedNickname = localStorage.getItem("nicknameStorage");
  const parsedNickname = JSON.parse(storedNickname);
  const userNickname = parsedNickname.state.userNickname;
  const [playerSubscribers, setPlayerSubscribers] = useState(subscribers);

  useEffect(() => {
    setPlayerSubscribers(subscribers);
  }, [subscribers]);

  return (
    <div className={styles.players}>
      <div>
        <UserVideoComponent nickname={userNickname} streamManager={publisher} solver={solver} />
      </div>
      {playerSubscribers.map((subscriber, index) => (
        <div key={index}>
          <UserVideoComponent nickname={subscriber.nickname} streamManager={subscriber.streamManager} solver={solver} />
        </div>
      ))}
    </div>
  );
};

export default Players;
