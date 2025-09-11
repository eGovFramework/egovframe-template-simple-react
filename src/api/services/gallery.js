import * as EgovNet from "@/api/egovFetch";

export const getGalleryList = async (searchCondition) => {
  const retrieveListURL = "/board" + EgovNet.getQueryString(searchCondition);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  };
  return new Promise((resolve, reject) => {
    EgovNet.requestFetch(
      retrieveListURL,
      requestOptions,
      (resp) => resolve(resp),
      (err) => reject(err)
    );
  });
};
