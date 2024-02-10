import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";

import { useAuthStore } from "../app/store";
import Container from "../components/Container";
import UserVideoComponent from "../feature/multiplay/openvidu/UserVideoComponent";
import Sidebar from "../feature/multiplay/Sidebar";

const WaitingPage = () => {
  const userId = useAuthStore((state) => state.user);

  const location = useLocation();
  const { sessionId, inviteCode, token, isModerator } = location.state;
  console.log(location.state);
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
      })
      .catch((error) => console.log("There was an error connecting to the session:", error));

    setSession(sessionInstance);

    return () => {
      if (sessionInstance) {
        sessionInstance.disconnect();
      }
    };
  }, [sessionId, token]);

  const copyToken = () => {};
  const startQuiz = () => {};

  return (
    <Container>
      <h1>WaitingPage : {sessionId}</h1>
      <div className="flex">
        <div className="w-4/6 h-[90vh] p-1 border-4 border-violet-500">
          {publisher && (
            <>
              {isModerator && <h3>방장</h3>}
              <h3>inviteCode : {isModerator ? inviteCode : "Only visible to the moderator"}</h3>
              구독자 : {subscribers.length}
              <UserVideoComponent streamManager={publisher} />
            </>
          )}
          {subscribers.map((subscriber, index) => (
            <UserVideoComponent key={index} streamManager={subscriber} />
          ))}
          <div>
            <div onClick={copyToken}>{token}</div>
            {isModerator && <button onClick={startQuiz}>시작하기</button>}
          </div>
        </div>
        <div className="w-2/6 h-[90vh] p-1 border-4 border-red-500">
          <Sidebar isManager={isModerator} />
        </div>
      </div>
    </Container>
  );
};

export default WaitingPage;
