import React from "react";

const SnsKakaoBt = (props) => {
  const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENTID; // 발급받은 클라이언트 아이디
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_CALLBACKURL // Callback URL
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

  const KakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  
  return <button onClick={KakaoLogin} className="btn login">카카오 로그인</button>;
};

export default SnsKakaoBt;