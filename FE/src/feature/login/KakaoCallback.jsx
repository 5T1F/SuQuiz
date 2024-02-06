import KakaoLogin from "react-kakao-login";

const SocialKakao = () => {
  const kakaoClientId = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
  const kakaoOnSuccess = async (data) => {
    console.log(data);
    const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달

    // express 백엔드
    const kakaoResponse = await axios.post(`${process.env.REACT_APP_API_ROOT}/users/login/kakao`, {
      Authorization: `Bearer ${access_token}`,
    });
    idToken = kakaoResponse.data.id;
  };
  const kakaoOnFailure = (error) => {
    console.log(error);
  };
  return (
    <>
      <KakaoLogin token={kakaoClientId} onSuccess={kakaoOnSuccess} onFail={kakaoOnFailure} />
    </>
  );
};

export default SocialKakao;
