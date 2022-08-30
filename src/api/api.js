import {get, init, put} from "./client.js";
import {isString} from "@aicore/libcommonutils";

const key = 'YWxhZGRpbjpvcGVuc2VzYW1l';

export async function hello() {
    const result = await get('/', {
        hello: 'world'
    });
    console.log(result);
}

export async function createTable(tableName) {
    if (!tableName || !isString(tableName)) {
        throw new Error('Please provide valid table Name');
    }
    await put('/createTable', {
        tableName: tableName
    });
}

init('http://localhost:5000', key);
//hello();

createTable('hello1');
