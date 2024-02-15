import * as Hangul from "hangul-js";

/**
 * 해당 함수 동기 처리된 함수라 await 달아서 사용해야합니다
 * 사용방법 : syllablesToWord 매개변수에 값 넣어주면 => 단어가 사전에 존재할 때 return true, 존재하지 않을 때 return false
 * 실행 안되면 modules install 하세요 !!
 * xml to json
 * modules : request, xml-js, buffer
 */

const chkArrays = [
  ["consonant", "vowel", "consonant", "vowel", "vowel"],
  ["consonant", "vowel", "consonant", "vowel", "consonant"],
  ["consonant", "vowel", "vowel", "consonant", "vowel"],
  ["consonant", "consonant", "vowel", "consonant", "vowel"],
  ["consonant", "vowel", "consonant", "consonant", "vowel"], // 앗사 아싸 -> 어케 구별? 둘 다 만들어서 체크
];

const CHO = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
const JOONG = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];
const JONG = [
  " ",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

export const syllablesToWord = async (syllables) => {
  syllables = syllables.split(""); // string to array
  let syllablesTypes = []; // syllables's types

  console.log(syllables);
  syllables.forEach((element) => {
    const checkingConsonant = /[ㄱ-ㅎ]/g;
    const checkingVowel = /[ㅏ-ㅣ]/g;

    if (element.match(checkingConsonant)) {
      syllablesTypes.push("consonant"); //자음?
    } else if (element.match(checkingVowel)) {
      syllablesTypes.push("vowel"); // 모음 ?
    }
  });

  // 단어 형성 가능? => print good / 단어 형성 불가? => return
  if (containsArray(chkArrays, syllablesTypes)) console.log("good");
  else return;

  console.log("before syllables ....", syllables);
  //   console.log(syllablesTypes);
  if (isCVCCV(syllablesTypes)) {
    // 쌍자음으로 합치기 전
    if (await existWord(Hangul.assemble(syllables))) return true;
    syllables = makeDoubleConsonant(syllables);
  } else {
    syllables = makeDoubleConsonant(syllables);
  }

  console.log("after syllables ....", syllables);

  const word = Hangul.assemble(syllables);
  const result = await existWord(word);
  //   console.log("word", word);
  //   console.log("SSSS", await existWord(word));

  return result;
};

const containsArray = (twoDimensionalArray, oneDimensionalArray) => {
  return twoDimensionalArray.some(
    (subArray) =>
      subArray.length === oneDimensionalArray.length &&
      subArray.every((element, index) => element === oneDimensionalArray[index])
  );
};

const isCVCCV = (syllablesTypes) => {
  const check = ["consonant", "vowel", "consonant", "consonant", "vowel"];
  return syllablesTypes.every((type, index) => type === check[index]);
};

const makeDoubleConsonant = (syllables) => {
  let converted = [];

  for (let i = 0; i < syllables.length; i++) {
    const current = syllables[i];
    const next = syllables[i + 1];

    if (current === "ㄱ" || current === "ㄷ" || current === "ㅂ" || current === "ㅅ" || current === "ㅈ") {
      // 'ㄱ' 'ㄱ'이 연속으로 나오는 경우
      if (Hangul.isCho(current) && Hangul.isCho(next) && CHO[CHO.indexOf(current)] === CHO[CHO.indexOf(next)]) {
        converted.push(CHO[CHO.indexOf(current) + 1]); // 'ㄲ'로 변환하여 추가
        //   console.log("convert", converted);
        i++; // 다음 문자는 이미 처리됐으므로 인덱스 증가
      } else {
        converted.push(current);
        //   console.log("convert", converted);
      }
    } else {
      converted.push(current);
      //   console.log("convert", converted);
    }
  }

  return converted;
};

const existWord = async (word) => {
  console.log(word);
  try {
    const res = await fetch(
      `/api/search?certkey_no=6324&key=85238546C2147D3E072CEE4D7CFDC684&target_type=search&req_type=xml&part=word&q=${word}&sort=dict&start=1&num=10&method=exact`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const data = await res.text();
    const xmlNode = new DOMParser().parseFromString(data, "text/xml");
    console.log("item ....", xmlToJson(xmlNode).channel.item);
    return !(typeof xmlToJson(xmlNode).channel.item === "undefined");
  } catch (error) {
    console.error("Error:", error);
    return false; // 오류 발생 시 false 반환
  }
};

// xml을 json으로 변환해주는 xmlToJson함수 선언
function xmlToJson(xml) {
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  }

  // do children
  // If all text nodes inside, get concatenated text from them.
  var textNodes = [].slice.call(xml.childNodes).filter(function (node) {
    return node.nodeType === 3;
  });
  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
      return text + node.nodeValue;
    }, "");
  } else if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

// const existWord = async (word) => {
//   let flag = false;
//   await fetch(
//     `/api/search?certkey_no=6324&key=95A142FF61D46DB8FFA6AACAA2ABF7FA&target_type=search&req_type=xml&part=word&q=${word}&sort=dict&start=1&num=10`,
//     {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//         "Access-Control-Allow-Origin": "*",
//       },
//     }
//   )
//     .then((res) => res.text())
//     .then((data) => {
//       const xmlNode = new DOMParser().parseFromString(data, "text/xml");
//       if (typeof xmlToJson(xmlNode).channel.item === "undefined") flag = false;
//       else flag = true;
//       console.log(flag);
//     })
//     .catch((error) => console.error("Error:", error))
//     .finally(() => {
//       return flag;
//     });
// };
