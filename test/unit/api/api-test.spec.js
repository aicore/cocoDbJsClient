/*global describe, it, beforeEach, afterEach*/
import * as assert from 'assert';
import mockedFunctions from "../setupmocks.js";
import * as chai from 'chai';
import {
    createIndex,
    createTable,
    deleteDocument,
    deleteTable, get,
    getFromIndex, getFromNonIndex,
    hello,
    init,
    put,
    update
} from "../../../src/index.js";
import {close} from "../../../src/api/client.js";
import FETCH from "../../../src/api/FETCH.js";
import {createDb, deleteDb, mathAdd, query} from "../../../src/api/api.js";

let expect = chai.expect;

describe('ut for ai', function () {
    beforeEach(function () {
        init('http://localhost', '123');
    });
    afterEach(function () {
        close();
    });
    it('hello should pass', async function () {

        const resp = await hello();
        expect(resp.hello).eql('world');

    });
    it('creatTable should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true
                        });
                    });

                }
            };
        };
        const resp = await createTable('hello');
        expect(resp.isSuccess).eql(true);
        FETCH.httpFetch = savedMock;

    });

    it('should  fail if table name is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await createTable('');
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid table Name');
        }
        expect(isExceptionOccurred).eql(true);
    });
    it('put should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            documentId: '1234',
                            isSuccess: true
                        });
                    });

                }
            };
        };
        const resp = await put('hello', {});
        expect(resp.isSuccess).eql(true);
        expect(resp.documentId).eql('1234');
        FETCH.httpFetch = savedMock;

    });
    it('put should  fail if table name is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await put('', {});
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid table Name');
        }
        expect(isExceptionOccurred).eql(true);
    });
    it('put should  fail if  document  is null', async function () {
        let isExceptionOccurred = false;
        try {
            await put('customers', null);
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid document');
        }
        expect(isExceptionOccurred).eql(true);
    });

    it('deleteDocument should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true
                        });
                    });

                }
            };
        };
        const resp = await deleteDocument('hello', '1234');
        expect(resp.isSuccess).eql(true);
        FETCH.httpFetch = savedMock;
    });
    it('deleteDocument with condition should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true
                        });
                    });

                }
            };
        };
        const resp = await deleteDocument('hello', '1234', "$.x<10");
        expect(resp.isSuccess).eql(true);
        FETCH.httpFetch = savedMock;
    });
    it('deleteDocument should  fail if table name is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await deleteDocument('', '1234');
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid table Name');
        }
        expect(isExceptionOccurred).eql(true);
    });
    it('deleteDocument should  fail if  document  is e,pty', async function () {
        let isExceptionOccurred = false;
        try {
            await deleteDocument('customers', '');
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid documentId');
        }
        expect(isExceptionOccurred).eql(true);
    });

    it('deleteTable should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true
                        });
                    });

                }
            };
        };
        const resp = await deleteTable('hello');
        expect(resp.isSuccess).eql(true);
        FETCH.httpFetch = savedMock;
    });
    it('deleteTable should  fail if table name is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await deleteTable('');
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid table Name');
        }
        expect(isExceptionOccurred).eql(true);
    });
    it('createIndex should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true
                        });
                    });

                }
            };
        };
        const resp = await createIndex('customers', 'id', 'INT', true, true);
        expect(resp.isSuccess).eql(true);
        FETCH.httpFetch = savedMock;
    });
    it('createIndex should pass for with out optional params', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true
                        });
                    });

                }
            };
        };
        const resp = await createIndex('customers', 'id', 'INT');
        expect(resp.isSuccess).eql(true);
        FETCH.httpFetch = savedMock;
    });

    it('createIndex should  fail if table name is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await createIndex('', 'id', 'INT', true, true);
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid table Name');
        }
        expect(isExceptionOccurred).eql(true);
    });

    it('createIndex should  fail if jsonfield is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await createIndex('customers', '', 'INT', true, true);
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid jsonField');
        }
        expect(isExceptionOccurred).eql(true);
    });
    it('createIndex should  fail if dataType is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await createIndex('customers', 'id', '', true, true);
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid dataType');
        }
        expect(isExceptionOccurred).eql(true);
    });
    it('update should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true
                        });
                    });

                }
            };
        };
        const resp = await update('customers', '1234', {});
        expect(resp.isSuccess).eql(true);
        FETCH.httpFetch = savedMock;
    });
    it('conditional update should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true
                        });
                    });

                }
            };
        };
        const resp = await update('customers', '1234', {}, "$.A<10");
        expect(resp.isSuccess).eql(true);
        FETCH.httpFetch = savedMock;
    });
    it('update should  fail if table name is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await update('', '1234', {});
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid table Name');
        }
        expect(isExceptionOccurred).eql(true);
    });
    it('update should  fail if document id is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await update('customers', '', {});
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid documentId');
        }
        expect(isExceptionOccurred).eql(true);
    });
    it('update should  fail if object is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await update('customers', '1234', null);
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid document');
        }
        expect(isExceptionOccurred).eql(true);
    });

    it('getFromNonIndex should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true,
                            results: [{
                                id: 10

                            }]

                        });
                    });

                }
            };
        };
        const resp = await getFromNonIndex('customers', {
            id: 10
        });
        expect(resp.isSuccess).eql(true);
        expect(resp.results[0].id).eql(10);
        FETCH.httpFetch = savedMock;
    });

    it('getFromNonIndex should  fail if table name is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await getFromNonIndex('', {
                id: 10
            });
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid table Name');
        }
        expect(isExceptionOccurred).eql(true);
    });


    it('getFromIndex should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true,
                            results: [{
                                id: 10

                            }]

                        });
                    });

                }
            };
        };
        const resp = await getFromIndex('customers', {
            id: 10
        });
        expect(resp.isSuccess).eql(true);
        expect(resp.results[0].id).eql(10);
        FETCH.httpFetch = savedMock;
    });

    it('getFromIndex should  fail if table name is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await getFromIndex('', {
                id: 10
            });
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid table Name');
        }
        expect(isExceptionOccurred).eql(true);
    });


    it('getFromIndex should  fail if query object is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await getFromIndex('customers', {});
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid queryObject');
        }
        expect(isExceptionOccurred).eql(true);
    });

    it('get should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return new Promise(resolve => {
                        resolve(JSON.stringify({
                            isSuccess: true,
                            document: {
                                id: 10
                            }

                        }));

                    });
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true
                        });
                    });

                }
            };
        };
        const resp = await get('customers', '1234');
        expect(resp.isSuccess).eql(true);
        expect(resp.document.id).eql(10);
        FETCH.httpFetch = savedMock;
    });
    it('get should  fail if table name is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await get('', '1234');
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid table Name');
        }
        expect(isExceptionOccurred).eql(true);
    });
    it('get should  fail if document id is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await get('customers', '');
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid document id');
        }
        expect(isExceptionOccurred).eql(true);
    });

    it('deleteDb should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true
                        });
                    });

                }
            };
        };
        const resp = await deleteDb('hello');
        expect(resp.isSuccess).eql(true);
        FETCH.httpFetch = savedMock;
    });
    it('deleteDb should  fail if table name is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await deleteDb('');
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid dataBaseName');
        }
        expect(isExceptionOccurred).eql(true);
    });
    it('createDb should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true
                        });
                    });

                }
            };
        };
        const resp = await createDb('hello');
        expect(resp.isSuccess).eql(true);
        FETCH.httpFetch = savedMock;
    });
    it('createDb should  fail if table name is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await createDb('');
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid dataBaseName');
        }
        expect(isExceptionOccurred).eql(true);
    });

    it('mathAdd should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true
                        });
                    });

                }
            };
        };
        const resp = await mathAdd('test.customer', '1', {
            id: 1
        });
        expect(resp.isSuccess).eql(true);
        FETCH.httpFetch = savedMock;
    });
    it('mathAdd should  fail if table name is empty', async function () {
        let isExceptionOccurred = false;
        try {
            const resp = await mathAdd('', '1', {
                id: 1
            });
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid table Name');
        }
        expect(isExceptionOccurred).eql(true);
    });
    it('mathAdd should  fail if document Id is empty', async function () {
        let isExceptionOccurred = false;
        try {
            const resp = await mathAdd('test.hello', '', {
                id: 1
            });
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid document id');
        }
        expect(isExceptionOccurred).eql(true);
    });

    it('mathAdd should  fail if jsonfield increments is empty', async function () {
        let isExceptionOccurred = false;
        try {
            const resp = await mathAdd('test.hello', '1', {});
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid increments');
        }
        expect(isExceptionOccurred).eql(true);
    });


    it('query should pass ', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true,
                            documents: [{
                                hello: 'world'
                            }]
                        });
                    });

                }
            };
        };
        const resp = await query('test.customer', '$.hello = "world"');
        expect(resp.isSuccess).eql(true);
        expect(resp.documents.length).eql(1);
        expect(resp.documents[0].hello).eql('world');
        FETCH.httpFetch = savedMock;
    });
    it('query should  fail if table name is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await query('', '$.hello = world');
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid table Name');
        }
        expect(isExceptionOccurred).eql(true);
    });
    it('query should  fail if queryString is empty', async function () {
        let isExceptionOccurred = false;
        try {
            await query('hello.world', '');
        } catch (e) {
            isExceptionOccurred = true;
            expect(e.toString().split('\n')[0].trim()).eql('Error: Please provide valid query String');
        }
        expect(isExceptionOccurred).eql(true);
    });

    it('query should pass if index specified', async function () {
        const savedMock = FETCH.httpFetch;
        FETCH.httpFetch = function (_endPoint, _args) {
            return {
                text: function () {
                    return null;
                },
                json: function () {
                    return new Promise(resolve => {
                        resolve({
                            isSuccess: true,
                            documents: [{
                                hello: 'world'
                            }]
                        });
                    });

                }
            };
        };
        const resp = await query('test.customer', "$.hello =  'world'",['hello']);
        expect(resp.isSuccess).eql(true);
        expect(resp.documents.length).eql(1);
        expect(resp.documents[0].hello).eql('world');
        FETCH.httpFetch = savedMock;
    });

});
