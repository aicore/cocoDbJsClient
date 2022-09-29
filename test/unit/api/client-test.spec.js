/*global describe, it,beforeEach*/
import mockedFunctions from "../setupmocks.js";
import * as chai from 'chai';
import {close, httpGet, httpPut, init} from "../../../src/api/client.js";
import FETCH from "../../../src/api/FETCH.js";
import {isObjectEmpty} from "@aicore/libcommonutils";

let expect = chai.expect;

describe('ut for http api', function () {
    beforeEach(function () {
        close();
    });
    it('httpGet should fail if not initialized', async function () {
        let isExceptionOccurred = false;
        try {

            await httpGet('/', {});
        } catch (e) {
            expect(e.toString().split('\n')[0]).eql('Error: Please call init before calling any api');
            isExceptionOccurred = true;

        }
        expect(isExceptionOccurred).eql(true);

    });
    it('httpPut should fail if not initialized', async function () {
        let isExceptionOccurred = false;
        try {

            await httpPut('/', {});
        } catch (e) {
            expect(e.toString().split('\n')[0]).eql('Error: Please call init before calling any api');
            isExceptionOccurred = true;

        }
        expect(isExceptionOccurred).eql(true);

    });
    it('httpGet should pass', async function () {
        init('http://localhost', '123');
        const resp = await httpGet('/', {});
        expect(resp.hello).eql('world');
    });
    it('httpGet should pass if args not specified', async function () {
        init('http://localhost', '123');
        const resp = await httpGet('/');
        expect(resp.hello).eql('world');
    });
    it('httpGet should fail if api endpoint is invalid', async function () {
        init('http://localhost', '123');
        let isExceptionOccurred = false;
        try {

            await httpGet('', {});
        } catch (e) {
            expect(e.toString().split('\n')[0].trim())
                .eql('Error: Please provide valid apiEndPoint given apiEndPoint is');
            isExceptionOccurred = true;

        }
        expect(isExceptionOccurred).eql(true);
    });
    it('httpGet should pass if api returns null body', async function () {
        init('http://localhost', '123');
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            hello: 'bob'
                        });
                    });

                }


            };
        };
        const resp = await httpGet('/', {});
        expect(isObjectEmpty(resp)).eql(true);
        FETCH.httpFetch = savedMock;
    });
    it('should  handle exception', async function () {
        init('http://localhost', '123');
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            throw new Error('error');
        };
        let isExceptionOccurred = false;
        try {

            await httpGet('/', {});
        } catch (e) {
            expect(e.toString().split('\n')[0].trim())
                .eql('Error: error occurred while issuing get for url http://localhost/');
            isExceptionOccurred = true;

        }
        expect(isExceptionOccurred).eql(true);
        FETCH.httpFetch = savedMock;
    });
    it('should  throw error if tried to init with invalid url', function () {
        let isExceptionOccurred = false;
        try {
            init('invalid', 'world');
        } catch (e) {
            expect(e.toString().split('\n')[0].trim())
                .eql('Error: please provide valid url');
            isExceptionOccurred = true;

        }
        expect(isExceptionOccurred).eql(true);
    });
    it('should  throw error if tried to init with invalid auth key', function () {
        let isExceptionOccurred = false;
        try {
            init('http://localhost', '');
        } catch (e) {
            expect(e.toString().split('\n')[0].trim())
                .eql('Error: please provide valid auth key');
            isExceptionOccurred = true;

        }
        expect(isExceptionOccurred).eql(true);
    });
    it('httpPut should pass', async function () {
        init('http://localhost', '123');
        const resp = await httpPut('/', {});
        expect(resp.hello).eql('bob');
    });
    it('httpPut should fail if api endpoint is invalid', async function () {
        init('http://localhost', '123');
        let isExceptionOccurred = false;
        try {

            await httpPut('', {});
        } catch (e) {
            expect(e.toString().split('\n')[0].trim())
                .eql('Error: Please provide valid apiEndPoint given apiEndPoint is');
            isExceptionOccurred = true;

        }
        expect(isExceptionOccurred).eql(true);
    });

    it('httpPut should  handle exception', async function () {
        init('http://localhost', '123');
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            throw new Error('error');
        };
        let isExceptionOccurred = false;
        try {

            await httpPut('/', {});
        } catch (e) {
            expect(e.toString().split('\n')[0].trim())
                .eql('Error: error occurred while issuing get for url http://localhost/');
            isExceptionOccurred = true;

        }
        expect(isExceptionOccurred).eql(true);
        FETCH.httpFetch = savedMock;
    });

    it('httpPut should pass if args is not specified', async function () {
        init('http://localhost', '123');
        const resp = await httpPut('/');
        expect(resp.hello).eql('bob');
    });

});
