import fetch from "node-fetch";

function httpFetch(apiEndPoint, args) {
    return fetch(apiEndPoint, args);
}

const FETCH = {
    httpFetch
};
export default FETCH;
