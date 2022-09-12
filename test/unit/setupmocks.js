import FETCH from "../../src/api/FETCH.js";

let setupDone = false;
let mockedFunctions = {
    fetch: function (_endPoint, _args) {
        return new Promise(resolve => {
            resolve({
                text: function () {
                    return JSON.stringify({
                        hello: 'world'
                    });
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            hello: 'bob'
                        });
                    });

                }


            });
        });
    }
};

function _setup() {
    if (setupDone) {
        return;
    }
    FETCH.httpFetch = mockedFunctions.fetch;

}

_setup();

export default mockedFunctions;

