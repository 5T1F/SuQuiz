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
    <div className={styles.video}>
      {userNickname}
      <video autoPlay={true} ref={videoRef} />
    </div>
  );
};

export default UserVideoComponent;
