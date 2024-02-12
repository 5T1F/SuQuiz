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
  const storedToken = localStorage.getItem("tokenStorage");
  const parsedToken = JSON.parse(storedToken);
  const accessToken = parsedToken.state.accessToken;
  const storedNickname = localStorage.getItem("nicknameStorage");
  const parsedNickname = JSON.parse(storedNickname);
  const userNickname = parsedNickname.state.userNickname;
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId, inviteCode, token, isModerator: initialIsModerator } = location.state;
  const [OV, setOV] = useState(null);
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModerator, setIsModerator] = useState(initialIsModerator);

  useEffect(() => {
    const OVInstance = new OpenVidu();
    setOV(OVInstance);
    const sessionInstance = OVInstance.initSession();

    sessionInstance.on("streamCreated", (event) => {
      const subscriber = sessionInstance.subscribe(event.stream, undefined);
      // 구독자의 connectionData에서 닉네임 파싱
      const connectionData = JSON.parse(event.stream.connection.data);
      const nickname = connectionData || "Anonymous";
      setSubscribers((prevSubscribers) => [
        ...prevSubscribers,
        { streamManager: subscriber, nickname: nickname }, // 구독자 객체에 닉네임 추가
      ]);
    });

    sessionInstance.on("streamDestroyed", (event) => {
      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter((sub) => sub.streamManager.stream.streamId !== event.stream.streamId)
      );
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
          mirror: true,
        });
        sessionInstance.publish(publisher);
        setPublisher(publisher);
      })
      .catch((error) => console.log("There was an error connecting to the session:", error));

    setSession(sessionInstance);

    // 새로운 방장 정보를 처리하는 이벤트 리스너 추가
    sessionInstance.on("signal:newModerator", (event) => {
      const newModeratorNickname = event.data;
      // 현재 사용자가 새로운 방장인지 확인하고 상태 업데이트
      if (userNickname === newModeratorNickname) {
        setIsModerator(true);
        console.log("방장이 되었습니다.");
      }
    });

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
  const leaveSession = async () => {
    const requestBody = {
      sessionId: sessionId,
      userId: userId,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/quizrooms/exit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // 여기에 방장이 방을 나갈 때 새로운 방장을 선정하는 로직을 추가
    if (isModerator && subscribers.length > 0) {
      // 새로운 방장 ID를 결정하는 로직 (예시로 첫 번째 구독자를 새 방장으로 설정)
      const newModeratorNickname = subscribers[0].nickname;
      // 새 방장 정보를 세션의 모든 참가자에게 신호로 전송
      session
        .signal({
          type: "newModerator",
          data: newModeratorNickname,
        })
        .then(() => {
          console.log("New moderator signal sent");
        })
        .catch((error) => {
          console.error("Error sending new moderator signal:", error);
        });
    }

    if (session) {
      session.disconnect();
      navigate("/quizLobby"); // 퇴장 후 리다이렉트
    }
  };

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
              <div onClick={leaveSession} className={styles.leave}>
                퇴장하기
              </div>
            </div>
            <div className="w-2/6 h-[90vh] p-1 border-4 border-red-500">
              <Sidebar isManager={isModerator} session={session} />
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
