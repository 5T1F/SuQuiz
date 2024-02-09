import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { useState, useEffect } from "react";

import UserVideoComponent from "./UserVideoComponent";
import "./playsers.module.css";

const APPLICATION_SERVER_URL = process.env.REACT_APP_OPENVIDU_SERVER_URL;

const App = () => {
  const [mySessionId, setMySessionId] = useState("suquiz");

  const storedNickname = localStorage.getItem("nicknameStorage");
  const parsedNickname = JSON.parse(storedNickname);
  const userNickname = parsedNickname.state.userNickname;

  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);

  // useEffect for componentDidMount
  useEffect(() => {
    const onBeforeUnload = (event) => {
      leaveSession();
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    // Cleanup function for componentWillUnmount
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager) => {
    setSubscribers((prevSubscribers) => prevSubscribers.filter((sub) => sub !== streamManager));
  };

  const joinSession = async () => {
    // --- 1) Get an OpenVidu object ---
    const ov = new OpenVidu();

    // --- 2) Init a session ---
    const mySession = ov.initSession();

    setSession(mySession);

    // ... (이하 코드는 그대로 유지)
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (session) {
      session.disconnect();
    }

    // Empty all properties...
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName("Participant" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const switchCamera = async () => {
    try {
      // ... (이하 코드는 그대로 유지)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      {this.state.session === undefined ? (
        <div id="join">
          <div id="img-div">
            <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
          </div>
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form className="form-group" onSubmit={this.joinSession}>
              <p>
                <label>Participant: </label>
                <div id="userName">{userNickname}</div>
              </p>
              <p>
                <label> Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={this.handleChangeSessionId}
                  required
                />
              </p>
              <p className="text-center">
                <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
              </p>
            </form>
          </div>
        </div>
      ) : null}

      {this.state.session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={this.leaveSession}
              value="Leave session"
            />
            <input
              className="btn btn-large btn-success"
              type="button"
              id="buttonSwitchCamera"
              onClick={this.switchCamera}
              value="Switch Camera"
            />
          </div>

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {publisher !== undefined ? (
              <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(publisher)}>
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div
                key={sub.id}
                className="stream-container col-md-6 col-xs-6"
                onClick={() => this.handleMainVideoStream(sub)}
              >
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
