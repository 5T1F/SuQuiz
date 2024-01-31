import { validateWord } from "../../apis/openDictApi"; // api.js 파일에서 validateWord 함수 import

const handleValidateWord = async () => {
  const word = "단어"; // 입력 받은 단어
  const wordCount = await validateWord(word); // 단어 유효성 검사
  if (wordCount > 0) {
    console.log(`${word}는(은) 우리말샘에 존재하는 단어입니다.`);
  } else {
    console.log(`${word}는(은) 우리말샘에 존재하지 않는 단어입니다.`);
  }
};
