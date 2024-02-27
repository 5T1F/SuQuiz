const storedAccessToken = sessionStorage.getItem("accessTokenStorage");
const parsedAccessToken = JSON.parse(storedAccessToken);
const accessToken = storedAccessToken === null ? null : await parsedAccessToken.state.accessToken;

// 닉네임으로 유저 검색
export async function searchNickname(searchValue) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends?search=${searchValue}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 친구 추가
export async function makeFriendship(userNickname, searchValue, accessToken) {
  try {
    const requestBody = {
      fromNickname: userNickname,
      toNickname: searchValue,
    };

    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
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

// 친구 삭제
export async function endFriendship(userNickname, friendNickname, accessToken) {
  try {
    const requestBody = {
      fromNickname: userNickname,
      toNickname: friendNickname,
    };

    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 친구 목록
export async function pullFriends(userId) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

// 친구 요청 대기 목록
export async function listRequestFriend(userId) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends/request/${userId}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 친구 수락
export async function acceptFriend(userNickname, waitingFriend) {
  try {
    const requestBody = {
      fromNickname: userNickname,
      toNickname: waitingFriend,
    };

    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/friends/accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 유저 정보
export async function userInfo(userId) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ROOT}/mypage/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("서버 응답이 실패했습니다.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
