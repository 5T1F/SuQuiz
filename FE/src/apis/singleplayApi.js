const BASE_URL = "http://localhost:8080";

// 싱글 플레이 결과 조회
export async function dailyResult(userId) {
  try {
    const response = await fetch(`${BASE_URL}/result/${userId}`, {
      method: "GET",
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
