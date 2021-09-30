import { SERVER_URL } from './config';

import URL from 'context/url';

export function requestFetch(url, requestOptions, handler, errorHandler) {
    console.groupCollapsed("requestFetch");
    console.log("requestFetch [URL] : ", SERVER_URL + url);
    console.log("requestFetch [requestOption] : ", requestOptions);

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
        .then(response =>  {// response Stream. Not completion object
            //console.log("requestFetch [Response Stream] ", response); 
            return response.json();
        })
        .then( (resp) => {
            console.groupCollapsed("requestFetch.then()");
            console.log("requestFetch [response] ", resp);
            if (typeof handler === 'function') {
                handler(resp);
            } else {
                console.log('egov fetch handler not assigned!');
            }
            console.groupEnd("requestFetch.then()");
        })
        .catch(error => {
            console.error('There was an error!', error);
            if (typeof errorHandler === 'function') {
                errorHandler(error);
            } else {
                console.error('egov error handler not assigned!');
                alert("ERR : " + error.message);
                
            }
        })
        .finally(() => {
            console.log("requestFetch finally end");    
            console.groupEnd("requestFetch");
        });
        console.log("requestFetch end");    
    
}