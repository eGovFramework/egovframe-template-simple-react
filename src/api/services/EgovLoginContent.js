import { postApi } from "../http";

export const login = (userInfo) => {
  const loginUrl = "/auth/login-jwt";
  return postApi(loginUrl, userInfo);
};
