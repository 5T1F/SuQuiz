import { useEffect, useState } from "react";

import { useMultiplayStore } from "../../app/store";

export default function LemonSuquiz(finger, stage) {
  const { resCnt, setResCnt } = useMultiplayStore();
  const [visitedList, setVisitedList] = useState([false, false, false, false, false]);

  // 손가락이 인식되면 채점하기 위해 실행
  useEffect(() => {
    if (finger) {
      // 3. 주어진 단어에 포함되면 자리 채우고,(2번 이상 들어가는 경우도 놓치지 말기)
      for (let i = 0; i < 5; i++) {
        // // api 완성되면 조건 수정하기
        // if (!visitedList[i] && quizList[i] === finger) {
        //   setVisitedList((prevVisitedList) => {
        //     const updatedList = [...prevVisitedList]; // 이전 상태를 복사하여 새로운 배열 생성
        //     updatedList[j] = true; // i번째 인덱스를 true로 변경
        //     return updatedList; // 새로운 배열을 반환하여 상태를 업데이트
        //   });
        // } // 4. 포함된 자모일 경우 차례 유지
        // // 5. 미포함일 경우 다음 차례 진행
        // else {
        //   setSolver(playersList[i++ % 4]);
        // }
        // // 6. 모든 자모를 맞추면 다음 문제
        // if (true) {
        //   i += 5;
        // }
      }
    }
  }, [finger]);

  return (
    <>
      <div className="border-4 border-violet-500">
        <h1>레몬수퀴즈</h1>
      </div>
    </>
  );
}
