import URL from "@/constants/URL";
import CODE from "@/constants/code";
import { setSessionItem } from "@/utils/storage";

export const responseInterceptor = (response) => {
  const resp = response.data;

  if (Number(resp.resultCode) === Number(CODE.RCV_ERROR_AUTH)) {
    alert("Login Alert");
    setSessionItem("loginUser", { id: "" });
    window.location.href = URL.LOGIN;
    throw new Error("인증 오류");
  }

  return resp;
};

export const responseInterceptorError = (error) => {
  console.error("There was an error!", error);

  if (error.message.includes("Network Error")) {
    alert("서버와의 연결이 원활하지 않습니다. 서버를 확인하세요.");
  }

  throw error;
};
