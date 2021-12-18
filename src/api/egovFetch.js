import { SERVER_URL } from '../config';

import URL from 'constants/url';
import CODE from 'constants/code';

export async function requestFetch(url, requestOptions, handler, errorHandler) {
    console.groupCollapsed("requestFetch");
    console.log("requestFetch [URL] : ", SERVER_URL + url);
    console.log("requestFetch [requestOption] : ", requestOptions);

    // CORS ISSUE 로 인한 조치 - origin 및 credentials 추가 
    // origin, credentials 추가 
    requestOptions['origin'] = SERVER_URL;
    // requestOptions['credentials'] = 'include';

    try {
        const res = await fetch(`${SERVER_URL}${url}` , requestOptions)
        const resp = await res.json();
        
        // TODO: error handle: 403 exception 처리 resultCode
        if (Number(resp.resultCode) === Number(CODE.RCV_ERROR_AUTH)) {
            alert("Login Alert");
            window.location.href = URL.LOGIN;
            return false;
        } else {
            console.groupCollapsed("requestFetch.then()");
            console.log("requestFetch [response] ", resp);
            if (typeof handler === 'function') {
                handler(resp);
            } else {
                console.warn('egov fetch handler not assigned!');
            }
            console.groupEnd("requestFetch.then()");
        }
    } catch (error) {
        console.error('There was an error!', error);
        if (error === 'TypeError: Failed to fetch') {
            alert("서버와의 연결이 원활하지 않습니다. 서버를 확인하세요.");
        }
        
        if (typeof errorHandler === 'function') {
            errorHandler(error);
        } else {
            console.error('egov error handler not assigned!');
            alert("ERR : " + error.message);
        }
    }

    console.log("requestFetch finally end");
    console.groupEnd("requestFetch");
}