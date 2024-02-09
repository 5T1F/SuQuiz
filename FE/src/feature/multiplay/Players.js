import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "./UserVideoComponent";

function Players() {
  const { sessionId } = useParams();
  const location = useLocation();
  const { token, isModerator } = location.state;
  const [OV, setOV] = useState(null);
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const OVInstance = new OpenVidu();
    setOV(OVInstance);
    const sessionInstance = OVInstance.initSession();

    sessionInstance.on("streamCreated", (event) => {
      const subscriber = sessionInstance.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    sessionInstance.on("streamDestroyed", (event) => {
      setSubscribers((prevSubscribers) => prevSubscribers.filter((sub) => sub !== event.stream.streamManager));
    });

    sessionInstance
      .connect(token)
      .then(() => {
        if (isModerator) {
          const publisher = OVInstance.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });
          sessionInstance.publish(publisher);
          setPublisher(publisher);
        }
      })
      .catch((error) => console.log("There was an error connecting to the session:", error));

    setSession(sessionInstance);

    return () => {
      if (session) {
        session.disconnect();
      }
    };
  }, [sessionId, token, isModerator]);

  return (
    <div>
      <h2>대기방: {sessionId}</h2>
      {publisher && (
        <>
          <h3>방장</h3>
          <UserVideoComponent streamManager={publisher} />
        </>
      )}
      {subscribers.map((subscriber, index) => (
        <UserVideoComponent key={index} streamManager={subscriber} />
      ))}
    </div>
  );
}

export default Players;
