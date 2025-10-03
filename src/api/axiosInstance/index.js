import { requestInterceptor } from "./interceptor/requestInterceptor";
import { responseInterceptor } from "./interceptor/responseInterceptor";
import axiosInstance from "./axiosInstance";

axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor);

export default axiosInstance;
