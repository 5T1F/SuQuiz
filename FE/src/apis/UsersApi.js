import axios from "axios";

// 카카오 로그인 API
export async function KakaoLoginAPI() {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY; // 발급 받은 REST API KEY
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI; // 작성했던 Callback URL
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  try {
    loginKakao();
  } catch (error) {
    console.error("Error login Naver:", error);
    throw error;
  }
}

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

// 네이버 로그인 API
export async function NaverLoginAPI() {
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID; // 발급 받은 Client ID
  const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_CALLBACK_URL; // 작성했던 Callback URL
  const STATE = "hLiDdL2uhPtsftcZ";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_url=${NAVER_CALLBACK_URL}`;

  //cors 이슈로 인해 href 방식으로 호출
  const loginNaver = () => {
    window.location.href = NAVER_AUTH_URL;
  };
  try {
    loginNaver();
  } catch (error) {
    console.error("Error login Naver:", error);
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
export async function signupUser(userEmail, checkValue, provider) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/login/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        nickname: checkValue,
        provider: provider,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
