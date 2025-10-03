import { getSessionItem } from "@/utils/storage";

export const requestInterceptor = (config) => {
  const sessionUser = getSessionItem("loginUser");
  const jToken = getSessionItem("jToken");

  if (sessionUser?.id) {
    config.headers.Authorization = jToken;
  }

  return config;
};

export const requestInterceptorError = (error) => {
  throw error;
};
