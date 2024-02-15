import React, { useState, useEffect, useRef } from "react";

import styles from "./UserVideoComponent.module.css";

const UserVideoComponent = ({ nickname, streamManager, solver, isPlaying }) => {
  const storedNickname = sessionStorage.getItem("nicknameStorage");
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
    <div
      className={` ${
        isPlaying
          ? solver === videoUserNickname
            ? styles.onSolverSet
            : styles.onSet
          : solver === videoUserNickname
          ? styles.solverSet
          : styles.set
      }`}
    >
      <video autoPlay={true} ref={videoRef} className={` ${isPlaying ? styles.onVideo : styles.video}`} />
      {userNickname === videoUserNickname ? (
        <div className={` ${isPlaying ? styles.onMyNickname : styles.myNickname}`}>{videoUserNickname}</div>
      ) : (
        <div className={` ${isPlaying ? styles.onNickname : styles.nickname}`}>{videoUserNickname}</div>
      )}
    </div>
  );
};

export default UserVideoComponent;
