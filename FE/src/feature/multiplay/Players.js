import React from "react";
import UserVideoComponent from "./openvidu/UserVideoComponent";
import LemonSuquiz from "./LemonSuquiz";

import styles from "./Players.module.css";

const Players = ({ publisher, subscribers, isPlaying }) => {
  return (
    <>
      {!isPlaying ? (
        <div className={styles.waiters}>
          <UserVideoComponent streamManager={publisher} />
          {subscribers.map((subscriber, index) => (
            <>
              <UserVideoComponent key={index} streamManager={subscriber} />
            </>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.multiplay}>
            {/* css 테스트하려고 */}
            <UserVideoComponent streamManager={publisher} />
            <UserVideoComponent streamManager={publisher} />
            <UserVideoComponent streamManager={publisher} />
            {subscribers.map((subscriber, index) => (
              <>
                <UserVideoComponent key={index} streamManager={subscriber} />
              </>
            ))}
            <LemonSuquiz className={styles.lemonSuquiz} />
          </div>
        </>
      )}
    </>
  );
};

export default Players;
