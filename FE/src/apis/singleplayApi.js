const BASE_URL = process.env.REACT_APP_API_ROOT + "/wordle";

// 오늘의 문제풀이 여부
export async function isSolved(userId) {
  try {
    const response = await fetch(`${BASE_URL}/solved/${userId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.data.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 데일리 문제
export async function dailyQuest() {
  try {
    const response = await fetch(`${BASE_URL}/daily`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.data.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 데일리 추가 문제
export async function additionalQuest() {
  try {
    const response = await fetch(`${BASE_URL}/additional`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.data.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 싱글 플레이 종료
export async function save(result) {
  try {
    const response = await fetch(BASE_URL + "/end", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.data.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 싱글 플레이 결과 조회
export async function dailyResult(userId) {
  try {
    const response = await fetch(`${BASE_URL}/result/${userId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.data.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
