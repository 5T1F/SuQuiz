import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";

import Container from "../components/Container";
import Players from "../feature/multiplay/Players";
import Sidebar from "../feature/multiplay/Sidebar";

import styles from "./MultiplayPage.module.css";

const MultiplayPage = () => {
  const storedId = localStorage.getItem("idStorage");
  const parsedId = JSON.parse(storedId);
  const userId = parsedId.state.userId;
  const location = useLocation();
  const { sessionId, inviteCode, token, isModerator } = location.state;
  const [OV, setOV] = useState(null);
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const copyCode = () => {
    // 텍스트를 복사하기 위한 임시 요소를 생성합니다.
    var tempInput = document.createElement("input");
    tempInput.value = inviteCode;

    // 요소를 페이지에 추가합니다.
    document.body.appendChild(tempInput);

    // 입력 요소를 선택하고 복사 명령을 실행합니다.
    tempInput.select();
    document.execCommand("copy");

    // 임시 요소를 제거합니다.
    document.body.removeChild(tempInput);
  };

  const startQuiz = () => {
    setIsPlaying(true);
    // 참가자들에게 게임시작 정보 소리치기
  };

  useEffect(() => {
    // 게임 시작
    // 1. 순서대로 정답 차례(streamManager 활용)
    const solver = null;
    // 2. 차례가 되면 수어 인식
    // 3. 주어진 단어에 포함되면 자리 채우고,(2번 이상 들어가는 경우도 놓치지 말기)
    // 4. 포함된 자모일 경우 차례 유지, 미포함일 경우 다음 차례 진행
    // 5. 모든 자모를 맞추면 다음 문제
    // 6. 3문제가 끝나면 게임 종료
  }, [isPlaying]);

  return (
    <Container>
      {!isPlaying ? (
        <>
          {/* 게임 시작 전 */}
          <h1>WaitingPage : {sessionId}</h1>
          <div className="flex">
            <div className="w-4/6 p-1 border-4 border-violet-500">
              <p>구독자 : {subscribers.length}</p>
              <Players publisher={publisher} subscribers={subscribers} />
              <div className="flex justify-center">
                <div className={styles.code} onClick={copyCode}>
                  {inviteCode}
                </div>
                {isModerator && (
                  <div onClick={startQuiz} className={styles.start}>
                    시작하기
                  </div>
                )}
              </div>
            </div>
            <div className="w-2/6 h-[90vh] p-1 border-4 border-red-500">
              <Sidebar isManager={isModerator} />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 게임 시작 후 */}
          <h1>QuizPage : {sessionId}</h1>
          <div className="p-1 border-4 border-violet-500">
            <Players publisher={publisher} subscribers={subscribers} isPlaying={isPlaying} />
          </div>
          <div className="p-1 border-4 border-red-500">
            <p>채팅창</p>
          </div>
        </>
      )}
    </Container>
  );
};

export default MultiplayPage;
