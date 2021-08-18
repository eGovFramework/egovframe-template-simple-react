import { SERVER_URL } from './config';

export function requestFetch(url, requestOptions, handler, errorHandler) {
    console.log("=====> egov fetch : "+SERVER_URL + url,);
    //this.setState({ [e.target.name]: e.target.value });
    //fetch('list.json')

    fetch(SERVER_URL + url, requestOptions)
        .then(function (response) {
            //console.log("===>>> json 1 = "+response.json());
            return response.json();
        })
        .then(function (json) {
            console.log("===>>> json = " + json);
            console.log("===>> "+typeof handler);
            if (typeof handler === 'function') {
                handler(json);
            } else {
                console.log('egov fetch handler not assigned!');
            }
        }.bind(this))
        .catch(error => {
            console.log( error);
            console.error('There was an error!', error);
            if (typeof errorHandler === 'function') {
                errorHandler(error);
            } else {
                console.log('egov error handler not assigned!');
                alert("ERR : "+error.message);
            }
        });
}