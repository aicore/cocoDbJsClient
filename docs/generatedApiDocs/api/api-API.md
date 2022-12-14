<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## hello

It makes a GET request to the root of the API

Returns **any** A function that returns a promise.

## createTable

It takes a table name as a parameter and returns a promise that resolves to the response from the server

### Parameters

*   `tableName`  The name of the table you want to create.

Returns **any** A promise

## createDb

It creates a database with the name provided in the databaseName parameter

### Parameters

*   `databaseName` **[string][1]** The name of the database you want to create.

Returns **[Promise][2]<[boolean][3]>** A promise

## deleteDb

It deletes the database with the given name

### Parameters

*   `databaseName` **[string][1]** The name of the database to be deleted.

Returns **[Promise][2]<[boolean][3]>** A promise.

## put

It takes a table name and a document as input and returns a promise

### Parameters

*   `tableName`  The name of the table you want to put the document in.
*   `document`  The document to be inserted.

Returns **any** A promise

## deleteDocument

It deletes a document from a table

### Parameters

*   `tableName`  The name of the table you want to delete the document from.
*   `documentId`  The documentId of the document you want to delete.

Returns **any** A promise

## deleteTable

It deletes a table from the database

### Parameters

*   `tableName`  The name of the table to be deleted.

Returns **any** A function that takes a tableName as an argument and returns a promise.

## createIndex

Create an index on a table

### Parameters

*   `tableName`  The name of the table you want to create an index on.
*   `jsonField`  The name of the field in the JSON object that you want to index.
*   `dataType`  The data type of the field.
*   `isUnique`  If true, the index will enforce that the column or columns do not contain any duplicate values.
*   `isNotNull`  If true, the column will not allow null values.

Returns **any** A promise

## update

It updates a document in a table

### Parameters

*   `tableName`  The name of the table in which the document is to be updated.
*   `documentId`  The id of the document to be updated.
*   `document`  The document to be updated.

Returns **any** A promise

## getFromNonIndex

It gets the document after scanning table

### Parameters

*   `tableName`  The name of the table you want to query.
*   `queryObject`  This is the object that you want to query. (optional, default `{}`)

Returns **any** A promise

## getFromIndex

This function will return a promise that will resolve to an array of objects that match the queryObject

### Parameters

*   `tableName`  The name of the table you want to query.
*   `queryObject`  This is the object that you want to query on.

Returns **any** A promise

## get

It takes a table name and a document id and returns the document

### Parameters

*   `tableName`  The name of the table in which the document is stored.
*   `documentId`  The id of the document you want to get.

Returns **any** A promise

## MathAddResponse

MathAddResponse

Type: [object][4]

### Properties

*   `isSuccess` **[boolean][3]** true is api is executed successfully false otherwise.
*   `errorMessage` **[string][1]?** This property detailed explanation of why call failed.

## mathAdd

This function will add the values of the fields in the jsonFieldsIncrements object to the corresponding fields in the
document with the given documentId in the given table

### Parameters

*   `tableName` **[string][1]** The name of the table in which the document is present.
*   `documentId` **[string][1]** The document id of the document you want to update.
*   `jsonFieldsIncrements` **[Object][4]** This is a JSON object that contains the fields and their increments.

Returns **[Promise][2]<[MathAddResponse][5]>** A promise

## query

`query` is a function that takes in a table name, a query string, and an optional useIndexForFields parameter, and
returns a promise that resolves to the result of the query

### Parameters

*   `tableName` **[string][1]** The name of the table you want to query.
*   `queryString` **[string][1]** This is the query string that you want to execute.
*   `useIndexForFields` **[Array][6]<[string][1]>** This is an array of fields that you want to use the index for. (optional, default `null`)

Returns **any** A promise

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[5]: #mathaddresponse

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
