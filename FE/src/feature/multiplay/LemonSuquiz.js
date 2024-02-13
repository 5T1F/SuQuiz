import { useEffect, useState } from "react";

import { useMultiplayStore } from "../../app/store";

export default function LemonSuquiz(resList, stage) {
  return (
    <>
      <div className="border-4 border-violet-500">
        <h1>레몬수퀴즈</h1>
        <h2>문제 : {stage + 1} / 3</h2>
        <div className="flex">
          {/* {resList.map((res, index) => (
            <div className="border-4 border-yellow-500">{res}</div>
          ))} */}
        </div>
      </div>
    </>
  );
}
