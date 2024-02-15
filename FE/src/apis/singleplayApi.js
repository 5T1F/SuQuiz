const storedToken = sessionStorage.getItem("tokenStorage");
const parsedToken = JSON.parse(storedToken);
const accessToken = parsedToken.state.accessToken;

// 오늘의 문제풀이 여부
export async function isSolved(userId) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/wordle/solved/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 데일리 문제
export async function dailyQuest() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/wordle/daily`, {
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

// 데일리 추가 문제
export async function additionalQuest() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/wordle/additional`, {
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

// 싱글 플레이 종료
export async function save(result) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/wordle/end`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(result),
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

// SNS 공유할 오늘의 결과 요청
export async function dailyShare(userId) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/wordle/result/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

// 싱글 플레이 결과 조회
export async function dailyResult(userId) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/wordle/result/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
