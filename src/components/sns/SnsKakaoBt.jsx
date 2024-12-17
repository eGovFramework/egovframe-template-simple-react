const SnsKakaoBt = () => {
  const KAKAO_CLIENT_ID = import.meta.env.VITE_APP_KAKAO_CLIENTID; // 발급받은 클라이언트 아이디
  const REDIRECT_URI = import.meta.env.VITE_APP_KAKAO_CALLBACKURL; // Callback URL
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

  const KakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <a href="#!" onClick={KakaoLogin} className="btn_center social kakao">
      <button>카카오 로그인</button>
    </a>
  );
};

export default SnsKakaoBt;
