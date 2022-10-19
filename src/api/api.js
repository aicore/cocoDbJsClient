// @INCLUDE_IN_API_DOCS
import {httpGet, httpPut} from "./client.js";
import {isObject, isBoolean, isStringEmpty, isObjectEmpty} from "@aicore/libcommonutils";
import {isString} from "@aicore/libcommonutils/src/utils/common.js";

export {init} from './client.js';

/**
 * It makes a GET request to the root of the API
 * @returns A function that returns a promise.
 */
export function hello() {
    return httpGet('/');
}

/**
 * It takes a table name as a parameter and returns a promise that resolves to the response from the server
 * @param tableName - The name of the table you want to create.
 * @returns A promise
 */
export function createTable(tableName) {
    if (isStringEmpty(tableName)) {
        throw new Error('Please provide valid table Name');
    }
    return httpPut('/createTable', {
        tableName: tableName
    });
}

/**
 * It creates a database with the name provided in the databaseName parameter
 * @param{string} databaseName - The name of the database you want to create.
 * @returns{Promise<boolean>} A promise
 */
export function createDb(databaseName) {
    if (isStringEmpty(databaseName)) {
        throw new Error('Please provide valid dataBaseName');
    }
    return httpPut('/createDb', {
        databaseName: databaseName
    });
}


/**
 * It deletes the database with the given name
 * @param{string} databaseName - The name of the database to be deleted.
 * @returns{Promise<boolean>} A promise.
 */
export function deleteDb(databaseName) {
    if (isStringEmpty(databaseName)) {
        throw new Error('Please provide valid dataBaseName');
    }
    return httpPut('/deleteDb', {
        databaseName: databaseName
    });
}


/**
 * It takes a table name and a document as input and returns a promise
 * @param tableName - The name of the table you want to put the document in.
 * @param document - The document to be inserted.
 * @returns A promise
 */
export function put(tableName, document) {
    if (isStringEmpty(tableName)) {
        throw new Error('Please provide valid table Name');
    }
    if (!isObject(document)) {
        throw new Error('Please provide valid document');

    }
    return httpPut('/put', {
        tableName: tableName,
        document: document
    });
}

/**
 * It deletes a document from a table
 * @param tableName - The name of the table you want to delete the document from.
 * @param documentId - The documentId of the document you want to delete.
 * @returns A promise
 */
export function deleteDocument(tableName, documentId) {
    if (isStringEmpty(tableName)) {
        throw new Error('Please provide valid table Name');
    }
    if (isStringEmpty(documentId)) {
        throw new Error('Please provide valid documentId');
    }
    return httpPut('/deleteDocument', {
        tableName: tableName,
        documentId: documentId
    });
}

/**
 * It deletes a table from the database
 * @param tableName - The name of the table to be deleted.
 * @returns A function that takes a tableName as an argument and returns a promise.
 */
export function deleteTable(tableName) {
    if (isStringEmpty(tableName)) {
        throw new Error('Please provide valid table Name');
    }
    return httpPut('/deleteTable', {
        tableName: tableName
    });
}

/**
 * Create an index on a table
 * @param tableName - The name of the table you want to create an index on.
 * @param jsonField - The name of the field in the JSON object that you want to index.
 * @param dataType - The data type of the field.
 * @param isUnique - If true, the index will enforce that the column or columns do not contain any duplicate values.
 * @param isNotNull - If true, the column will not allow null values.
 * @returns A promise
 */
export function createIndex(tableName, jsonField, dataType, isUnique, isNotNull) {
    if (isStringEmpty(tableName)) {
        throw new Error('Please provide valid table Name');
    }
    if (isStringEmpty(jsonField)) {
        throw new Error('Please provide valid jsonField');
    }
    if (isStringEmpty(dataType)) {
        throw new Error('Please provide valid dataType');
    }
    return httpPut('/createIndex', {
        tableName: tableName,
        jsonField: jsonField,
        dataType: dataType,
        isUnique: isBoolean(isUnique) ? isUnique : false,
        isNotNull: isBoolean(isNotNull) ? isNotNull : false
    });
}

/**
 * It updates a document in a table
 * @param tableName - The name of the table in which the document is to be updated.
 * @param documentId - The id of the document to be updated.
 * @param document - The document to be updated.
 * @returns A promise
 */
export function update(tableName, documentId, document) {
    if (isStringEmpty(tableName)) {
        throw new Error('Please provide valid table Name');
    }
    if (isStringEmpty(documentId)) {
        throw new Error('Please provide valid documentId');
    }
    if (!isObject(document)) {
        throw new Error('Please provide valid document');
    }
    return httpPut('/update', {
        tableName: tableName,
        documentId: documentId,
        document: document
    });
}

/**
 * It gets the document after scanning table
 * @param tableName - The name of the table you want to query.
 * @param queryObject - This is the object that you want to query.
 * @returns A promise
 */
export function getFromNonIndex(tableName, queryObject = {}) {
    if (isStringEmpty(tableName)) {
        throw new Error('Please provide valid table Name');
    }
    return httpPut('/getFromNonIndex', {
        tableName: tableName,
        queryObject: queryObject
    });
}

/**
 * This function will return a promise that will resolve to an array of objects that match the queryObject
 * @param tableName - The name of the table you want to query.
 * @param queryObject - This is the object that you want to query on.
 * @returns A promise
 */
export function getFromIndex(tableName, queryObject) {
    if (isStringEmpty(tableName)) {
        throw new Error('Please provide valid table Name');
    }
    if (isObjectEmpty(queryObject)) {
        throw new Error('Please provide valid queryObject');
    }
    return httpPut('/getFromIndex', {
        tableName: tableName,
        queryObject: queryObject
    });
}

/**
 * It takes a table name and a document id and returns the document
 * @param tableName - The name of the table in which the document is stored.
 * @param documentId - The id of the document you want to get.
 * @returns A promise
 */
export function get(tableName, documentId) {
    if (isStringEmpty(tableName)) {
        throw new Error('Please provide valid table Name');
    }
    if (isStringEmpty(documentId)) {
        throw new Error('Please provide valid document id');
    }
    return httpGet('/get', {
        tableName: tableName,
        documentId: documentId
    });
}

/**
 * MathAddResponse
 * @typedef{object} MathAddResponse
 * @property {boolean} isSuccess - true is api is executed successfully false otherwise.
 * @property {string} [errorMessage] - This property detailed explanation of why call failed.
 */


/**
 * This function will add the values of the fields in the jsonFieldsIncrements object to the corresponding fields in the
 * document with the given documentId in the given table
 * @param {string} tableName - The name of the table in which the document is present.
 * @param {string} documentId - The document id of the document you want to update.
 * @param {Object}jsonFieldsIncrements - This is a JSON object that contains the fields and their increments.
 * @returns{Promise<MathAddResponse>} A promise
 */
export function mathAdd(tableName, documentId, jsonFieldsIncrements) {
    if (isStringEmpty(tableName)) {
        throw new Error('Please provide valid table Name');
    }
    if (isStringEmpty(documentId)) {
        throw new Error('Please provide valid document id');
    }
    if (isObjectEmpty(jsonFieldsIncrements)) {
        throw  new Error('Please provide valid increments');
    }
    return httpPut('/mathAdd', {
        tableName: tableName,
        documentId: documentId,
        jsonFieldsIncrements: jsonFieldsIncrements
    });
}

/**
 * `query` is a function that takes in a table name, a query string, and an optional useIndexForFields parameter, and
 * returns a promise that resolves to the result of the query
 * @param{string} tableName - The name of the table you want to query.
 * @param {string} queryString - This is the query string that you want to execute.
 * @param {Array<string>}[useIndexForFields=null] - This is an array of fields that you want to use the index for.
 * @returns A promise
 */
export function query(tableName, queryString, useIndexForFields = null) {
    if (isStringEmpty(tableName)) {
        throw new Error('Please provide valid table Name');
    }
    if (!isString(queryString) || isStringEmpty(queryString)) {
        throw new Error('Please provide valid query String');
    }
    if (!useIndexForFields) {
        return httpPut('/query', {
            tableName: tableName,
            queryString: queryString
        });
    }
    return httpPut('/query', {
        tableName: tableName,
        queryString: queryString,
        useIndexForFields: useIndexForFields
    });
}
