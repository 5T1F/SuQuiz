const BASE_URL = process.env.REACT_APP_API_ROOT;

export async function validateWord(word) {
  const REACT_APP_OPENDICT_REST_API_KEY = process.env.REACT_APP_OPENDICT_REST_API_KEY;
  const API_URL = `https://opendict.korean.go.kr/api/search?key=${REACT_APP_OPENDICT_REST_API_KEY}&q=${word}&req_type=json&advanced=y$method=exact&num=1`;
  try {
    const response = await fetch(API_URL, {
      method: "GET",
    });

    const data = await response.json();
    return data.channel.total;
  } catch (error) {
    console.error("Error fetching data:", error);
    return 0;
  }
}
