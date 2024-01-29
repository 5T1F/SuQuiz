import KakaoLogin from "react-kakao-login";

const LoginKakao = () => {
  const JAVASCRIPT_KEY = e8615fc854cc498095c6cb52acbe0aea;
  const kakaoOnSuccess = async (data) => {
    console.log(data);
    const idToken = data.response.access_token;
  };
  const kakaoOnFailure = (e) => {
    console.error();
  };

  return (
    <>
      <KakaoLogin token={JAVASCRIPT_KEY} onSuccess={kakaoOnSuccess} onFail={kakaoOnFailure} />
    </>
  );
};

export default LoginKakao;
