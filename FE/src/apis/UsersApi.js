// 컨트롤러 별로 api.js 파일 나눠서 생성할 것
// (예시) 로그인 로그아웃 회원가입

const BASE_URL = process.env.REACT_APP_API_ROOT;

// 카카오 로그인
export async function loginUser(authorizationCode) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/login/kakao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authorizationCode),
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

// 네이버 로그인
export async function loginUser(authorizationCode, state) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/login/kakao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authorizationCode, state),
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

// 여기서부터 다시 작성!!!!!!!!!!!!

// 로그아웃
export async function logoutUser(user) {
  try {
    const response = await fetch(BASE_URL + "/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 회원가입
export async function signupUser(user) {
  try {
    const response = await fetch(BASE_URL + "/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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
