import axios from "axios";

const storedToken = sessionStorage.getItem("tokenStorage");
const parsedToken = JSON.parse(storedToken);
const accessToken = parsedToken.state.accessToken;

// 방 만들기
export async function makeMultiplaySession(userId) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/sessions/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 코드로 입장하기
export async function joinMultiplaySession(codeValue) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/quizrooms/isJoinable/${codeValue}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 게임 진행 여부 조회
export async function isPlayingSession(codeValue) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/quizrooms/isPlaying/${codeValue}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 토큰을 받아서 입장하기
export async function enterSession(userId, codeValue) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/sessions/${codeValue}/token/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 랭킹 조회
export async function pullRanking(userId) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/ranking/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }); // API 경로
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
