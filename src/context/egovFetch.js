import { SERVER_URL } from './config';
import debug from 'debug';

import URL from 'context/url';
import CODE from 'context/code';

export const requestFetch = (url, requestOptions, handler, errorHandler) => {
  const log = debug('egov:requestFetch');
  log('url:', SERVER_URL + url);
  log('requestOption:', requestOptions);

  //CORS ISSUE 로 인한 조치 - origin 및 credentials 추가
  // origin 추가
  if (!requestOptions['origin']) {
    requestOptions = { ...requestOptions, origin: SERVER_URL };
  }
  // credentials 추가
  if (!requestOptions['credentials']) {
    requestOptions = { ...requestOptions, credentials: 'include' };
  }

  fetch(SERVER_URL + url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (Number(response.resultCode) === Number(CODE.RCV_ERROR_AUTH)) {
        alert('Login Alert');
        window.location.href = URL.LOGIN;
        return false;
      } else {
        return response;
      }
    })
    .then((response) => {
      log('response', { response });
      if (typeof handler === 'function') {
        handler(response);
      } else {
        log('egov fetch handler not assigned!');
      }
    })
    .catch((error) => {
      log('There was an error!', { error });
      if (error === 'TypeError: Failed to fetch') {
        alert('서버와의 연결이 원활하지 않습니다. 서버를 확인하세요.');
      }

      if (typeof errorHandler === 'function') {
        errorHandler(error);
      } else {
        log('egov error handler not assigned!');
        alert('ERR : ' + error.message);
      }
    })
    .finally(() => {
      log('requestFetch finally end');
    });
};
