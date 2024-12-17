const SnsNaverBt = () => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_APP_NAVER_CLIENTID; // 발급받은 클라이언트 아이디
  const REDIRECT_URI = import.meta.env.VITE_APP_NAVER_CALLBACKURL; // Callback URL
  const STATE = import.meta.env.VITE_APP_STATE; //다른 서버와 통신 시 암호화문자
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  const NaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <a href="#!" onClick={NaverLogin} className="btn_center social naver">
      <button>네이버 로그인</button>
    </a>
  );
};

export default SnsNaverBt;
