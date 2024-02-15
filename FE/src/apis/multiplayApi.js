const storedToken = sessionStorage.getItem("tokenStorage");
const parsedToken = JSON.parse(storedToken);
const accessToken = parsedToken.state.accessToken;

// 멀티플레이 참가자 정보
export async function players(sessionId) {
  try {
    // api 완성되면 경로 수정하기
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/quizrooms/players/${sessionId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
// 멀티플레이 시작
export async function start(sessionId) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/quizrooms/start/${sessionId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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

// 멀티플레이 출제 리스트
export async function quiz() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/quizrooms/multi/quest`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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

// 멀티플레이 방 나가기
export async function exitQuiz() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/quizrooms/exit`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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

// 멀티플레이 종료
export async function end(sessionId, userId, myScore) {
  const request = {
    userId: userId,
    myScore: myScore,
  };
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/quizrooms/end/${sessionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(request),
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
