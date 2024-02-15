import React, { useState, useEffect } from "react";
import UserVideoComponent from "./openvidu/UserVideoComponent";
import styles from "./Players.module.css";

const Players = ({ publisher, subscribers, solver, isPlaying }) => {
  const storedNickname = sessionStorage.getItem("nicknameStorage");
  const parsedNickname = JSON.parse(storedNickname);
  const userNickname = parsedNickname.state.userNickname;
  const [playerSubscribers, setPlayerSubscribers] = useState(subscribers);

  useEffect(() => {
    setPlayerSubscribers(subscribers);
  }, [subscribers]);

  return (
    <>
      <div className={isPlaying ? styles.players : styles.waiters}>
        <UserVideoComponent nickname={userNickname} streamManager={publisher} solver={solver} isPlaying={isPlaying} />
        {playerSubscribers.map((subscriber, index) => (
          <UserVideoComponent
            nickname={subscriber.nickname}
            streamManager={subscriber.streamManager}
            solver={solver}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </>
  );
};

export default Players;
