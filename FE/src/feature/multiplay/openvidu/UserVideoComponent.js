import React, { useState, useEffect, useRef } from "react";

import styles from "./UserVideoComponent.module.css";

const UserVideoComponent = ({ nickname, streamManager }) => {
  const videoRef = useRef();
  const [userNickname, setUserNickname] = useState("");

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
    setUserNickname(nickname);
  }, [streamManager]);

  return (
    <div className={styles.set}>
      <video autoPlay={true} ref={videoRef} />
      <div className={styles.nickname}>{userNickname}</div>
    </div>
  );
};

export default UserVideoComponent;
