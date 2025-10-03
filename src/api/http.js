import axiosInstance from "./axiosInstance";

// GET
export const getApi = async (url, params = {}) => {
  const res = await axiosInstance.get(url, { params });
  return res;
};

// POST
export const postApi = async (url, body = {}) => {
  const res = await axiosInstance.post(url, body);
  return res;
};

// PUT
export const putApi = async (url, body = {}) => {
  const res = await axiosInstance.put(url, body);
  return res;
};

// DELETE
export const deleteApi = async (url, params = {}) => {
  const res = await axiosInstance.delete(url, { params });
  return res;
};
