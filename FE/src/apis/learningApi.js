const BASE_URL = "";
const storedToken = localStorage.getItem("tokenStorage");
const parsedToken = JSON.parse(storedToken);
const accessToken = parsedToken.state.accessToken;

// 전체 주제명 조회 (1 일상 2 관계 3 감정 ...등)
export async function AllSubject() {
  try {
    const response = await fetch(`${BASE_URL}/subject/allSub`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 주제별 단어 목록 조회
export async function AllWordWithSubject(userId, subjectName) {
  try {
    const response = await fetch(`${BASE_URL}/subject/all/${userId}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ subjectName: subjectName }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 단어 조회
export async function allWords() {
  try {
    const response = await fetch(`${BASE_URL}/word/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 카테고리별 단어 조회
export async function wordsfromCategory(userId, category) {
  try {
    const response = await fetch(`${BASE_URL}/word/categoryWords/${userId}?category=${category}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 단어장에 저장한 모든 단어 목록 조회
export async function allWordsByUser(userId) {
  try {
    const response = await fetch(`${BASE_URL}/bookmarks/words/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 단어장에 단어 추가
export async function addWordsByUser(userId, wordName) {
  const userWord = {
    userId: userId,
    wordName: wordName,
  };
  try {
    const response = await fetch(BASE_URL + "/bookmarks/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(userWord),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 단어장에서 단어 삭제
export async function deleteWordsByUser(userId, wordName) {
  const userWord = {
    userId: userId,
    wordName: wordName,
  };
  try {
    const response = await fetch(BASE_URL + "/bookmarks/words", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(userWord),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
