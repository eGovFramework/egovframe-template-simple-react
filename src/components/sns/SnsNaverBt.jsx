import { issueState } from "@/utils/oauthState";

const SnsNaverBt = () => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_APP_NAVER_CLIENTID;
  const REDIRECT_URI = import.meta.env.VITE_APP_NAVER_CALLBACKURL;

  const NaverLogin = () => {
    const state = issueState("naver");
    const url =
      "https://nid.naver.com/oauth2.0/authorize?response_type=code" +
      `&client_id=${encodeURIComponent(NAVER_CLIENT_ID)}` +
      `&state=${encodeURIComponent(state)}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = url;
  };

  return (
    <a href="#!" onClick={NaverLogin} className="btn_center social naver">
      <button>네이버 로그인</button>
    </a>
  );
};

export default SnsNaverBt;
