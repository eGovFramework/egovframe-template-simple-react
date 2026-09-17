import { useEffect, useRef } from "react";
import * as EgovNet from "@/api/egovFetch";
import CODE from "@/constants/code";
import { setSessionItem } from "@/utils/storage";
import { consumeState } from "@/utils/oauthState";
import { useAuth } from "@/contexts/AuthContext";

const SnsNaverCallback = () => {
  const { refresh } = useAuth();
  // dev StrictMode 의 useEffect 이중 실행으로 consumeState 가 두 번째 호출에서 실패해
  // false-positive 알럿이 뜨는 것을 막기 위한 1회 실행 가드
  const didRunRef = useRef(false);
  const callBackEnd = () => {
    const params = new URLSearchParams(window.location.search);
    let code = params.get("code");
    let state = params.get("state");

    if (!code || !state) {
      window.location.replace("/");
      return;
    }

    // state 1회용 검증 — CSRF 방어
    if (!consumeState("naver", state)) {
      alert("인증 요청이 유효하지 않습니다. 다시 시도해 주세요.");
      window.location.replace("/");
      return;
    }

    // 요청이 성공하면
    if (code) {
      const naverLoginUrl = `/login/naver/callback?code=${code}&state=${state}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      };
      EgovNet.requestFetch(naverLoginUrl, requestOptions, (resp) => {
        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          const { id, name, userSe, uniqId } = resp.resultVO || {};
          setSessionItem("loginUser", { id, name, userSe, uniqId });
          refresh(); // AuthContext 갱신
          //props.onChangeLogin(resultVO);
          // PC와 Mobile 열린메뉴 닫기
          document.querySelector(".all_menu.WEB").classList.add("closed");
          document.querySelector(".btnAllMenu").classList.remove("active");
          document.querySelector(".btnAllMenu").title = "전체메뉴 닫힘";
          document.querySelector(".all_menu.Mobile").classList.add("closed");
          alert("Sns 간편 로그인 중..."); //공통 alert 사용대신해서
          window.location.replace("/");
        } else {
          window.location.replace("/");
        }
      });
    }
  };
  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;
    callBackEnd();
    // 마운트 시 1회만 실행(didRunRef 가드) — deps 고정 의도
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* 로그인중이라는 것을 표시할 수 있는 로딩중 화면 */}
      <h1 className="btn_social">로그인 중...</h1>
    </>
  );
};

export default SnsNaverCallback;
