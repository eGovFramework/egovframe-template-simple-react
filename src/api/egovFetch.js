import { SERVER_URL } from "../config";

import URL from "@/constants/url";
import CODE from "@/constants/code";
import { getSessionItem, setSessionItem } from "@/utils/storage";
import { logger } from "@/utils/logger";

export function getQueryString(params) {
  return `?${Object.entries(params)
    .map((e) => e.join("="))
    .join("&")}`;
}

export function requestFetch(url, requestOptions, handler, errorHandler) {
  // JWT는 httpOnly 쿠키로 전달 — credentials: "include" 로 브라우저가 자동 첨부
  if (!requestOptions["credentials"]) {
    requestOptions = { ...requestOptions, credentials: "include" };
  }

  fetch(SERVER_URL + url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((resp) => {
      if (Number(resp.resultCode) === Number(CODE.RCV_ERROR_AUTH)) {
        alert("Login Alert");
        setSessionItem("loginUser", { id: "" });
        window.location.href = URL.LOGIN;
        return false;
      } else {
        return resp;
      }
    })
    .then((resp) => {
      if (typeof handler === "function") {
        handler(resp);
      } else {
        logger.warn("egov fetch handler not assigned");
      }
    })
    .catch((error) => {
      logger.error("requestFetch error"); // 26.05.14 보안취약점 조치 : error 객체 미노출
      if (error === "TypeError: Failed to fetch") {
        alert("서버와의 연결이 원활하지 않습니다. 서버를 확인하세요.");
      }

      if (typeof errorHandler === "function") {
        errorHandler(error);
      } else {
        alert("요청 처리 중 오류가 발생했습니다."); // 26.05.14 보안취약점 조치 : 메시지 대체
      }
    });
}
