import { getApi } from "../http";

export const fetchAdminBoardList = (srchCnd) => {
  const retrieveListURL = "/bbsMaster";
  return getApi(retrieveListURL, { srchCnd });
};
