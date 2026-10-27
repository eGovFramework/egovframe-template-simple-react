import { SERVER_URL } from "../config";

import URL from "@/constants/url";
import CODE from "@/constants/code";
import { setSessionItem } from "@/utils/storage";
import { logger } from "@/utils/logger";

export function getQueryString(params) {
  return `?${new URLSearchParams(params).toString()}`;
}

// 인증 상태 조회처럼 401이 정상적인 익명 상태인 호출은 자동 이동을 끌 수 있다.
export function requestFetch(url, requestOptions, handler, errorHandler, { redirectOnUnauthorized = true } = {}) {
  // JWT는 httpOnly 쿠키로 전달 — credentials: "include" 로 브라우저가 자동 첨부
  if (!requestOptions["credentials"]) {
    requestOptions = { ...requestOptions, credentials: "include" };
  }

  return fetch(SERVER_URL + url, requestOptions)
    .then(async (response) => {
      // 보안 필터의 401은 본문 형식과 무관하게 기존 인증 오류 경로로 보낸다.
      if (response.status === 401 && redirectOnUnauthorized) {
        return { resultCode: CODE.RCV_ERROR_AUTH };
      }
      if (!response.ok) {
        let message = `HTTP error: ${response.status}`;
        try {
          const body = await response.json();
          if (typeof body?.resultMessage === "string" && body.resultMessage.trim()) {
            message = body.resultMessage;
          }
        } catch {
          // 빈 본문이나 HTML 오류 페이지는 HTTP 상태를 대신 전달한다.
        }
        throw new Error(message);
      }
      return response.json();
    })
    .then((resp) => {
      if (Number(resp.resultCode) === Number(CODE.RCV_ERROR_AUTH)) {
        alert("로그인이 필요합니다. 다시 로그인해 주세요.");
        setSessionItem("loginUser", { id: "" });
        window.location.href = URL.LOGIN;
        return;
      }

      if (typeof handler === "function") {
        handler(resp);
      } else {
        logger.warn("egov fetch handler not assigned");
      }
    })
    .catch((error) => {
      logger.error("requestFetch error"); // 26.03.04 KISA 보안취약점 조치 : error 객체 미노출
      if (error instanceof TypeError) {
        alert("서버와의 연결이 원활하지 않습니다. 서버를 확인하세요.");
      }

      if (typeof errorHandler === "function") {
        errorHandler(error);
      } else {
        alert("요청 처리 중 오류가 발생했습니다."); // 26.03.04 KISA 보안취약점 조치 : 메시지 대체
      }
    });
}
