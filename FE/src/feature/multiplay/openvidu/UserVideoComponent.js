import React, { useEffect, useRef } from "react";

import styles from "./UserVideoComponent.module.css";

const UserVideoComponent = ({ streamManager }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <div>
      <video className={styles.userVideo} autoPlay={true} ref={videoRef} />
    </div>
  );
};

export default UserVideoComponent;
