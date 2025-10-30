import axios from "axios";
import { SERVER_URL } from "../../config";

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

export default api;
