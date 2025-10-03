import { getApi } from "../http";
export const fetchMainPage = () => {
  const retrieveListURL = "/mainPage";
  return getApi(retrieveListURL);
};
