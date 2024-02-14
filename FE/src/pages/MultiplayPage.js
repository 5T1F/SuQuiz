import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import Container from "../components/Container";
import Players from "../feature/multiplay/Players";
import Sidebar from "../feature/multiplay/Sidebar";
import MyCam from "../feature/Learning/MyCam";
import LemonSuquiz from "../feature/multiplay/LemonSuquiz";
import { exitQuiz, playsers, quiz } from "../apis/multiplayApi";

import GroupsIcon from "@mui/icons-material/Groups";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import styles from "./MultiplayPage.module.css";
import { button } from "@material-tailwind/react";

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
  const [playersList, setPlayersList] = useState([]);
  const [isFour, setIsFour] = useState(false);
  const [solver, setSolver] = useState(null);
  const [stage, setStage] = useState(0);
  const order = 0;
  const [quizList, setQuizList] = useState([]);
  const [quizWordList, setQuizWordList] = useState([]);
  const [quizViedoList, setQuizVideoList] = useState([]);
  const [resCnt, setResCnt] = useState(0);
  const resList = [" ", " ", " ", " ", " "];
  const visitedList = [false, false, false, false, false];
  const [isAnswer, setIsAnswer] = useState(false);
  const [isStartStage, setIsStartStage] = useState(true);
  const [isModerator, setIsModerator] = useState(initialIsModerator);
  const [finger, setFinger] = useState("#");
  const changeFinger = (value) => {
    setFinger(value);
    console.log(value);
  };

  useEffect(() => {
    const OVInstance = new OpenVidu();
    setOV(OVInstance);
    const sessionInstance = OVInstance.initSession();

    sessionInstance.on("streamCreated", (event) => {
      const subscriber = sessionInstance.subscribe(event.stream, undefined);
      // 구독자의 connectionData에서 닉네임 파싱
      console.log(event.stream.connection.data);
      const connectionData = event.stream.connection.data;
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
          resolution: "320x240",
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

  const startQuiz = async () => {
    setIsPlaying(true); // 퀴즈 시작으로 변경

    if (session) {
      await session
        .signal({
          data: JSON.stringify({ isPlaying: true }), // 퀴즈 시작 정보를 담아서,
          type: "quiz-start",
        })
        .then(() => {
          console.log("Quiz successfully start");
        })
        .catch((error) => {
          console.error("Error starting quiz:", error);
        });
    }
  };

  // 새로운 참가자가 들어오면 4명인지 검사하기 위해 실행
  useEffect(() => {
    const fetchData = async () => {
      try {
        const players = await playsers(sessionId);
        setPlayersList(players.data);
        // 배포 전에 4로 수정하기 ***************************************
        if (players.data.length < 5) {
          setIsFour(true);
        }
      } catch (error) {
        console.error("Error fetching playersList:", error);
      }
    };

    fetchData();
  }, [subscribers]);

  // 게임이 시작되면 문제를 가져오기 위해 실행
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const wordle = await quiz();
        // 정답 단어를 리스트에 저장
        const extractedWordNames = wordle.data.map((item) => item.wordName);
        setQuizWordList(extractedWordNames);
        // 정답 수어 영상을 리스트에 저장
        const extractedViedeoUrls = wordle.data.map((item) => item.videoUrl);
        setQuizVideoList(extractedViedeoUrls);

        // 데이터에서 syllables만 추출하여 quizList에 저장
        const extractedSyllables = wordle.data.map((item) => item.syllables);
        console.log(extractedSyllables);
        setQuizList(extractedSyllables);
      } catch (error) {
        console.error("Error fetching playersList:", error);
      }
    };

    fetchQuiz();
  }, [isPlaying]);

  const changeSolver = async () => {
    setSolver(playersList[order++ % 4]);

    if (session) {
      await session
        .signal({
          data: JSON.stringify({ solver: solver }), // 퀴즈 시작 정보를 담아서,
          type: "change-solver",
        })
        .then(() => {
          console.log("Solver successfully change");
        })
        .catch((error) => {
          console.error("Error changing solver:", error);
        });
    }
  };

  const changeResList = async (i) => {
    resList[i] = finger;
    visitedList[i] = true;

    if (session) {
      await session
        .signal({
          data: JSON.stringify({
            resList: resList,
          }), // 퀴즈 시작 정보를 담아서,
          type: "change-resList",
        })
        .then(() => {
          console.log("ResList successfully change");
        })
        .catch((error) => {
          console.error("Error changing resList:", error);
        });
    }
  };

  const changeStage = async () => {
    setStage((prevResCnt) => prevResCnt + 1);
    setIsAnswer(true);

    if (session) {
      await session
        .signal({
          data: JSON.stringify({
            isAnswer: isAnswer,
            stage: stage,
            res: " ",
            visited: false,
          }), // 퀴즈 시작 정보를 담아서,
          type: "change-stage",
        })
        .then(() => {
          console.log("Stage successfully change");
        })
        .catch((error) => {
          console.error("Error changing stage:", error);
        });
    }
  };

  // 문풀자의 finger가 인식되면 채점을 위해 실행되는 부분
  useEffect(() => {
    if (finger) {
      for (let i = stage; i < stage + 5; i++) {
        if (!visitedList[i] && quizList[i] === finger) {
          setResCnt((prevResCnt) => prevResCnt + 1);
          changeResList(i);
        }
        // 모든 자모를 맞추면 다음 문제
        if (resCnt === 5) {
          changeStage();
        }
      }
    }
  }, [finger]);

  useEffect(() => {
    // 게임이 시작되면 실행될 콜백 함수
    const handleStartQuiz = (event) => {
      const data = JSON.parse(event.data);
      console.log("Quiz start :", data.isPlaying);
      setIsPlaying(data.isPlaying); // 참가자들의 퀴즈 시작 정보 세팅
      // 게임 시작
      for (; stage < 3; ) {
        // 1. 문풀자의 차례가 순서대로 진행, 참가자들에게 알림
        changeSolver();
        // 2. 문풀자가 바뀌면, MyCam이 인식 -> 문풀자의 finger 채점
        // 여기서부터 useEffect[finger]에서 처리
        // 4. 나온 적 없는 자모 && 정답이라면
        // 5. 해당 자리에 자모 채우고
        // 6. resCnt += 정답 자모 수
        // 7. resCnt가 5가 되면 stage++
      }
      // 3문제가 끝나면 게임 종료
    };

    const handleChangeSolver = (event) => {
      const data = JSON.parse(event.data);
      console.log("now solver :", data.solver);
      setSolver(data.solver); // 현재 문풀자 정보 세팅
    };

    const handleSetResList = (event) => {
      const newData = JSON.parse(event.data);
      resList = [newData.resList[0], newData.resList[1], newData.resList[2], newData.resList[3], newData.resList[4]];
    };

    const handleSetStage = (event) => {
      const newData = JSON.parse(event.data);
      setStage(newData.stage);
      setIsAnswer(newData.isAnswer);
      resList = [newData.res, newData.res, newData.res, newData.res, newData.res];
      visitedList = [newData.visited, newData.visited, newData.visited, newData.visited, newData.visited];
    };

    if (session) {
      session.on("signal:quiz-start", handleStartQuiz); // 게임 시작 정보 전달
      session.on("signal:change-solver", handleChangeSolver); // 문풀자 변경 정보 전달
      session.on("signal:change-resList", handleSetResList); // 답안지 리스트 변경 정보 전달
      session.on("signal:change-stage", handleSetStage); // 스테이지 변경 정보 전달
    }

    return () => {
      if (session) {
        session.off("signal:quiz-start", handleStartQuiz);
      }
    };
  }, [session]);

  const leaveSession = async () => {
    const requestBody = {
      sessionId: sessionId,
      userId: userId,
    };

    try {
      await exitQuiz();
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
      <div className={`${isPlaying ? "" : styles.container}`}>
        {!isPlaying ? (
          <>
            {/* 게임 시작 전 */}
            <div className={styles.leftContainer}>
              <div className={styles.topButton}>
                <div className={styles.member}>
                  <GroupsIcon fontSize="large" /> &nbsp;
                  {subscribers.length + 1} / 4
                </div>
                <button onClick={leaveSession} className={styles.leave}>
                  나가기
                </button>
              </div>
              <Players publisher={publisher} subscribers={subscribers} />
              <div className={styles.bottomButton}>
                <div className={styles.code} onClick={copyCode}>
                  입장 코드 : {inviteCode} &nbsp;
                  <ContentCopyIcon fontSize="x-small" />
                </div>
                {isModerator ? (
                  <>
                    {/* 방장 */}
                    {/* 4명이 모이기 전/후 */}
                    {isFour ? (
                      <div onClick={startQuiz} className={styles.start}>
                        시작하기
                      </div>
                    ) : (
                      <div className={styles.unactive}>시작하기</div>
                    )}
                  </>
                ) : (
                  <>{/* 참가자라서 시작하기 버튼 X */}</>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 게임 시작 후 */}
            {solver === userNickname ? (
              <>
                <div className={styles.mycam}>
                  <MyCam categoryNumber={4} changeFinger={changeFinger} isVideoVisible={false}></MyCam>
                </div>
              </>
            ) : (
              <></>
            )}
            {resList.length === 5 && (
              <>
                <div className="p-1 border-4 border-violet-500">
                  <div onClick={leaveSession} className={styles.leave}>
                    퇴장하기
                  </div>
                  <Players publisher={publisher} subscribers={subscribers} />
                  <div className={styles.video}>
                    <video loop autoPlay muted>
                      <source src={quizViedoList[stage - 1]} type="video/mp4" />
                      영상이 존재하지 않습니다.
                    </video>
                  </div>
                  <LemonSuquiz resList={resList} stage={stage} />
                  {isAnswer && <></>}
                </div>
              </>
            )}
          </>
        )}
        <div className={`${isPlaying ? styles.bottombar : styles.sidebar}`}>
          <Sidebar isManager={isModerator} session={session} isPlaying={isPlaying} />
        </div>
      </div>
    </Container>
  );
};

export default MultiplayPage;
