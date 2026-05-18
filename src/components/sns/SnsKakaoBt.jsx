import { issueState } from "@/utils/oauthState";

const SnsKakaoBt = () => {
  const KAKAO_CLIENT_ID = import.meta.env.VITE_APP_KAKAO_CLIENTID;
  const REDIRECT_URI = import.meta.env.VITE_APP_KAKAO_CALLBACKURL;

  const KakaoLogin = () => {
    const state = issueState("kakao");
    const url =
      "https://kauth.kakao.com/oauth/authorize?response_type=code" +
      `&client_id=${encodeURIComponent(KAKAO_CLIENT_ID)}` +
      `&state=${encodeURIComponent(state)}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = url;
  };

  return (
    <a href="#!" onClick={KakaoLogin} className="btn_center social kakao">
      <button>카카오 로그인</button>
    </a>
  );
};

export default SnsKakaoBt;
