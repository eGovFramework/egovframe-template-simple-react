import { getApi } from "../http";
export const logOut = () => {
  // 로그인 정보 존재할 때
  const logOutUrl = "/auth/logout";
  return getApi(logOutUrl);
};
