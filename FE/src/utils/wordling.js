export const wordling = (answer, input) => {
  // answer = "ㅇㅓㅁㅁㅏ";
  // input = "ㅇㅁㅁㅏㅓ";
  //   answer = "ㅇㅓㅁㅁㅏ";
  const result = new Array(5).fill(0); // 0 회색, 1 노란, 2 초록

  // 정답을 Map객체에 매핑
  const answerMap = new Map();
  for (let index = 0; index < answer.length; index++) {
    const c = answer.charAt(index);
    answerMap.set(c, (answerMap.get(c) || 0) + 1);

    // if (!answerMap.get(answer.charAt(index))) {
    //   answerMap.set(answer.charAt(index), 1);
    // } else {
    //   answerMap.set(answer.charAt(index), answerMap.get(answer.charAt(index)) + 1);
    // }
  }

  // 1. 초록색인지 체크
  for (let index = 0; index < answer.length; index++) {
    if (answer.charAt(index) === input.charAt(index)) {
      result[index] = 2;
      answerMap.set(answer.charAt(index), answerMap.get(answer.charAt(index)) - 1);
    }
  }

  console.log("result", result);
  console.log("answer", answerMap);

  // 2. 노란색인지 체크
  for (let index = 0; index < input.length; index++) {
    if (result[index] !== 2 && answerMap.get(input.charAt(index)) > 0) {
      result[index] = 1;
      answerMap.set(input.charAt(index), answerMap.get(input.charAt(index)) - 1);
    }
  }
  console.log("result", result);

  return result;
};
