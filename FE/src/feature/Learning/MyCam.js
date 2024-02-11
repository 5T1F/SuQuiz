// import React from 'react';
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { Hands, HAND_CONNECTIONS, Results } from "@mediapipe/hands"; // 여기에 있는 Results를 사용하려고 함 18번째 줄에서, Results는 interface로 제공됨
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

import styles from "./MyCam.module.css";

function customCompare(prev, next) {
  const pr = JSON.stringify(prev);
  const ne = JSON.stringify(next);
  return pr === ne;
}

const MyCam = ({ categoryNumber, changeFinger }) => {
  /**
   *  access DOM element
   *  why? document.getElement => useRef
   */

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    let count = 0;
    let value = "";

    // setInterval(() => console.log(new Date()), 1000);
    /**
     * getContext가 useEffect안에 있어야하는 이유 !!
     * => getContext는 컴포넌트가 마운트되야 사용할 수 있다.
     * => useEffect는 컴포넌트가 마운트된 후 실행되는 생명주기 메소드다.
     */
    const canvasCtx = canvasRef.current.getContext("2d");
    if (!canvasCtx) return;

    console.log("useEffect in"); // localhost:8000
    /**
     * web socket !!!
     *
     * https:// => wss://
     * 127.0.0.1 => host
     * 8000 => port : 해당포트에서 웹소켓 서비스를 제공하는 Django server에 접근
     * /ws 웹소켓 연결을 위한 경로
     *
     * Django는 ASGI로 실행되어야함 ... 매우매우 중요
     */
    // const url = "ws://" + "localhost:8000" + "/ws/somepath/";
    const url = "ws://" + "i10b302.p.ssafy.io:8000/" + "ws/" + `${categoryNumber}`;
    socketRef.current = new WebSocket(url);

    // 소켓 연결
    socketRef.current.onopen = () => {
      console.log("web socket connection established");
    };

    // 소켓 에러
    socketRef.current.onerror = (error) => {
      console.error("web socket error", error);
    };

    // 서버에서 데이터 수신
    socketRef.current.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      // console.log("msg : ", msg.response);

      if (msg.response !== null) {
        if (count > 30) {
          console.log("output : ", value);

          // let copyFinger = value;
          changeFinger(value);
          count = 0;
        } else {
          if (value === msg.response) {
            count += 1;
          } else {
            value = msg.response;
            count = 0;
          }
        }
      }
    };

    /**
     * mediapipe
     */
    const hands = new Hands({
      locateFile: (file) => {
        console.log(file);
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    // callback function
    hands.onResults((results) => {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      canvasCtx.translate(canvasRef.current.width, 0);
      canvasCtx.scale(-1, 1);
      canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

      if (results.multiHandLandmarks.length > 0) {
        // drawing landmarks
        for (const landmarks of results.multiHandLandmarks) {
          // console.log(socketRef.current.CONNECTING);
          if (socketRef.current.CONNECTING === 0) {
            sendMsg(landmarks);
          }

          // console.log("landmarks", landmarks);
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
            color: "#90de8a",
            lineWidth: 1,
          });
          drawLandmarks(canvasCtx, landmarks, {
            color: "#FF0000",
            radius: 0.2,
          });
        }

        // send data to server
        // const msg = results.multiHandLandmarks[0];

        // if (results.multiHandLandmarks) {
        //     for (const landmarks of results.multiHandLandmarks) {
        //         socketRef.current.send(JSON.stringify(landmarks));
        //     }
        // }
      }

      canvasCtx.restore();
    });

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // getUserMedia 지원확인
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.current.srcObject = stream;

        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            await hands.send({ image: videoRef.current });
          },
          width: 1280,
          height: 360,
        });
        camera.start();
      });
    }

    const sendMsg = (landmarks) => {
      socketRef.current.send(JSON.stringify({ message: landmarks }));
    };
  });

  return (
    <div>
      <video ref={videoRef} className={styles.video}></video>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>

      {/* draw landmarks to hand
            <canvas
                ref={canvasRef}
                // className={styles.canvas}
                width={800}
                height={600}
            />
            {/* 좌표 출력 */}
      {/*} <div>
                <button onClick={() => {}}>
                    Output Data
                </button>
            </div> */}
    </div>
  );
};

export default React.memo(MyCam, customCompare);
// export default React.memo(MyCam);
// export default MyCam
