import {isString} from "@aicore/libcommonutils";
import {URL} from 'url';
import fetch from 'node-fetch';

let _authKey = null;
let _serviceEndPoint = null;

function _isValidUrl(url) {
    try {
        // eslint-disable-next-line no-new
        new URL(url);
        return true;
    } catch (e) {
        return false;

    }
}

/**
 * It takes two strings as arguments, and if they're valid, it sets the values of two private variables
 * @param {string} serviceEndPoint - The URL of the API endpoint.
 * @param {string} authKey - The auth key is a unique key that is generated for each user.
 * This key is used to authenticate the
 * user.
 */
export function init(serviceEndPoint, authKey) {
    if (!isString(serviceEndPoint) || !_isValidUrl(serviceEndPoint)) {
        throw new Error(('please provide valid url'));
    }
    if (!isString(authKey)) {
        throw new Error('please provide valid auth key');
    }
    _serviceEndPoint = serviceEndPoint;
    _authKey = 'Basic ' + authKey;
}

/**
 * If the endPoint and authKey are not set, then the function returns true
 * @returns {boolean} A boolean value.
 */
function _isInitialized() {
    return !(!_serviceEndPoint && !_authKey);
}


/**
 * It takes an apiEndPoint and an optional args object and returns a promise that resolves to the response body of the
 * get
 * request
 * @param apiEndPoint - The api endpoint to be called.
 * @param [args=null] - This is the query string parameters that you want to pass to the API.
 * @returns {Promise} A function that returns a promise on resolve promise to get response.
 */
export async function get(apiEndPoint, args = null) {
    if (!_isInitialized()) {
        throw new Error('Please call init before calling any api');
    }
    if (!apiEndPoint || !isString(apiEndPoint) || !apiEndPoint.startsWith('/')) {
        throw new Error(`Please provide valid apiEndPoint given apiEndPoint is ${apiEndPoint}`);
    }
    const getApiEndPoint = _serviceEndPoint + apiEndPoint;
    try {
        const queryUrl = new URL(getApiEndPoint);
        if (args) {
            Object.keys(args).forEach(key => queryUrl.searchParams.append(key, args[key]));
        }

        const response = await fetch(queryUrl.toString(), {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'authorization': _authKey
            }
        });
        const body = await response.text();
        return body ? JSON.parse(body) : {};
    } catch (e) {
        console.error(JSON.stringify(e));
        throw new Error(`error occurred while issuing get for url ${getApiEndPoint}`);
    }
}

/**
 * It takes an apiEndPoint and an optional args object and returns a promise that resolves to the response of the api
 * call
 * @param apiEndPoint - The api end point to be called.
 * @param [args=null] - This is the data that you want to send to the server.
 */
export async function put(apiEndPoint, args = null) {
    if (!_isInitialized()) {
        throw new Error('Please call init before calling any api');
    }
    if (!apiEndPoint || !isString(apiEndPoint) || !apiEndPoint.startsWith('/')) {
        throw new Error(`Please provide valid apiEndPoint given apiEndPoint is ${apiEndPoint}`);
    }
    const putApiEndPoint = _serviceEndPoint + apiEndPoint;
    try {
        const response = await fetch(putApiEndPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': _authKey
            },
            body: args ? JSON.stringify(args) : ''
        });
        const data = await response.json();
        console.log(data);
        return data;

    } catch (e) {
        console.error(JSON.stringify(e));
        throw new Error(`error occurred while issuing get for url ${putApiEndPoint}`);
    }
}
