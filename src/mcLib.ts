// use client to gain data, then convert to plain object.
import mcClient = require('./mcClient');
import {Promise} from 'es6-promise';

export interface IMcQueryEntry {
    name: string;
    path: string;
}

export interface IMcResultEntry {
    name: string;
    value: number | string;
}

export interface IMcResult {
    list: IMcResultEntry[];
}

function count(data): number {
    let arr = data['value'];
    return arr.length;
}

export default function(client: mcClient.IMcClient, queries: IMcQueryEntry[]): Promise<IMcResult> {
    let base: Promise<IMcResult> = Promise.resolve({list: []});
    for (let entry of queries){
        base = base.then<IMcResult>(function(result){
            return client.get(entry.path).then(count).then(function(cou){
                result.list.push({
                    name: entry.name,
                    value: cou
                });
                return result;
            });
        });
    }

    return base;
}
