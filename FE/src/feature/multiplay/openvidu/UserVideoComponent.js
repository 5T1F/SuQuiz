import React, { useState, useEffect, useRef } from "react";

import styles from "./UserVideoComponent.module.css";

const UserVideoComponent = ({ nickname, streamManager }) => {
  const storedNickname = localStorage.getItem("nicknameStorage");
  const parsedNickname = JSON.parse(storedNickname);
  const userNickname = parsedNickname.state.userNickname;
  const videoRef = useRef();
  const [videoUserNickname, setVideoUserNickname] = useState("");

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
    setVideoUserNickname(nickname);
  }, [streamManager]);

  return (
    <div className={styles.set}>
      <video autoPlay={true} ref={videoRef} className={styles.video} />
      {userNickname === videoUserNickname ? (
        <div className={styles.myNickname}>{videoUserNickname}</div>
      ) : (
        <div className={styles.nickname}>{videoUserNickname}</div>
      )}
    </div>
  );
};

export default UserVideoComponent;
