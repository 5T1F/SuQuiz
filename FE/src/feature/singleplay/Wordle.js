function generateHangulWord() {
  // 한글 자모 배열
  const firstLetter = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  const middleLetter = [
    "ㅏ",
    "ㅑ",
    "ㅓ",
    "ㅕ",
    "ㅗ",
    "ㅛ",
    "ㅜ",
    "ㅠ",
    "ㅡ",
    "ㅣ",
    "ㅐ",
    "ㅒ",
    "ㅔ",
    "ㅖ",
    "ㅢ",
    "ㅚ",
    "ㅟ",
  ];
  const lastLetter = ["", "ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  const doubleLetters = ["ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ"]; // 된소리 목록

  let word = "";
  let letterCount = 0;

  while (letterCount < 5) {
    // 자모 랜덤 선택
    const firstIndex = Math.floor(Math.random() * firstLetter.length);
    const middleIndex = Math.floor(Math.random() * middleLetter.length);
    let lastIndex = Math.floor(Math.random() * lastLetter.length);

    // 총 자모 수 확인 및 조정
    let currentLetterCount = 2; // 초성과 중성은 항상 포함
    if (doubleLetters.includes(firstLetter[firstIndex])) {
      currentLetterCount++; // 된소리인 경우 추가 계산
    }

    if (lastLetter[lastIndex] !== "") {
      currentLetterCount++; // 종성이 있는 경우
    }
    if (letterCount + currentLetterCount > 5) {
      lastIndex = 0; // 종성 제거
    }

    // 유니코드로 한글 문자 생성
    const hangulChar = String.fromCharCode(0xac00 + firstIndex * 588 + middleIndex * 28 + lastIndex);
    word += hangulChar;
    letterCount += currentLetterCount;
  }

  return word;
}

export default function Wordle() {
  return (
    <>
      <h1>워들</h1>
      <div>오늘의 단어 정답은? 두구두구두구</div>
      <div>
        -{">"} {generateHangulWord()}{" "}
      </div>
    </>
  );
}
