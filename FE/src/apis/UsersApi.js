import axios from "./https";

// 카카오 로그인 인가 코드 발급
export async function oauthKakao(code) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/users/login/kakao`, {
      authorizationCode: code,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 네이버 로그인 인가 코드 발급
export async function oauthNaver(code, state) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/users/login/naver`, {
      authorizationCode: code,
      state: state,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 기존 회원인지 확인
export async function checkIsMember(email, provider) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ROOT}/users/login/checkNickname/${email}/${provider}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 닉네임 중복 검사
export async function checkNickname(checkValue) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/users/login/validate/${checkValue}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 회원정보 수정
export async function modifyNickname(userId, checkValue) {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_ROOT}/mypage/modify`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        modifiedName: checkValue,
      }),
    }); // API 경로
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 회원가입
// export async function signupUser(user) {
//   try {
//     const response = await fetch(BASE_URL + "/users/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// }
