import React from "react";
import UserVideoComponent from "./openvidu/UserVideoComponent";

import styles from "./Players.module.css";

const Players = ({ publisher, subscribers }) => {
  return (
    <div className={styles.players}>
      {/* css 테스트하려고 */}
      <UserVideoComponent streamManager={publisher} />
      <UserVideoComponent streamManager={publisher} />
      <UserVideoComponent streamManager={publisher} />
      <UserVideoComponent streamManager={publisher} />
      {/* {subscribers.map((subscriber, index) => (
        <>
          <UserVideoComponent key={index} streamManager={subscriber} />
        </>
      ))} */}
    </div>
  );
};

export default Players;
