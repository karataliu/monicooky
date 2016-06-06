// use client to gain data, then convert to plain object.
import mcClient = require('./mcClient');
import {Promise} from 'es6-promise';

let urls = {
    "azure.rgcount": {
        path: "/subscriptions/test/resourceGroups?api-version=2014-04-01"
    },
     "azure.rgcount1": {
        path: "/subscriptions/test/resourceGroups?api-version=2014-04-01"
    }
};

let path = "/subscriptions/test/resourceGroups?api-version=2014-04-01";

function count(data) {
    let arr = data['value'];
    return arr.length;
}

export default function(client: mcClient.IMcClient): Promise<Object> {
    return client.get(path).then(count).then((cou) => {
        return {
            "a1": cou
        };
    });
}
