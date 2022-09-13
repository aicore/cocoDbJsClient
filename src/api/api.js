import {httpGet, httpPut} from "./client.js";
import {isObject, isBoolean, isStringEmpty, isObjectEmpty} from "@aicore/libcommonutils";

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
export function getFromNonIndex(tableName, queryObject) {
    if (isStringEmpty(tableName)) {
        throw new Error('Please provide valid table Name');
    }
    if (isObjectEmpty(queryObject)) {
        throw new Error('Please provide valid queryObject');
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
