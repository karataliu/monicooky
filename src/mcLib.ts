// use client to gain data, then convert to plain object.
import lib = require('../src/mcClient');
import {Promise} from 'es6-promise';

let conf = {
    "tenantId": "",
    "clientId": "",
    "secret": "",
};

let path = "/subscriptions/test/resourceGroups?api-version=2014-04-01";
let options: lib.McClientOptions = conf;
let client = new lib.McClient(options);

function count(data) {
    let arr = data['value'];
    return arr.length;
}

export default function(): Promise<Object> {
    return client.get(path).then(count).then((cou) => {
        return {
            "a1": cou
        };
    });
}
