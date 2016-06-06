// use client to gain data, then convert to plain object.
import { IMcClient, IMcQueryEntry, IMcResult } from './common';
import {Promise} from 'es6-promise';

function count(data): number {
    let arr = data['value'];
    return arr.length;
}

export default function(client: IMcClient, queries: IMcQueryEntry[]): Promise<IMcResult> {
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
