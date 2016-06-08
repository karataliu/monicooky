// use client to gain data, then convert to plain object.
import { IMcClient, IMcQueryEntry, IMcResult, ISubscription, IMcResultEntry } from './common';
import {Promise} from 'es6-promise';

function count(data): number {
    let arr = data['value'];
    return arr.length;
}

export default function (client: IMcClient, queries: IMcQueryEntry[]): Promise<IMcResult> {
    let base: Promise<IMcResult> = Promise.resolve({ list: [] });
    for (let entry of queries) {
        base = base.then<IMcResult>(function (result) {
            return client.get(entry.path).then(count).then(function (cou) {
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

export class McLib {
    private client: IMcClient;

    constructor(client: IMcClient) {
        this.client = client;
    }

    listSubscriptions(): Promise<ISubscription[]> {
        return this.client.get("/subscriptions").then(function (data: any) {
            return new Promise<ISubscription[]>(function (resolve, reject) {
                let subs: ISubscription[] = [];

                if (!data.value || Object.prototype.toString.call(data.value) !== '[object Array]') {
                    reject('value not an array.');
                    return;
                }

                let list: Array<any> = data.value;
                for (let item of list) {
                    if (!item.subscriptionId || !item.displayName) {
                        reject('invalid response');
                        return;
                    }

                    subs.push({
                        id: item.subscriptionId,
                        name: item.displayName
                    });
                }

                resolve(subs);
            });
        });
    }

    executeQuery(entry: IMcQueryEntry): Promise<IMcResultEntry> {
        return this.client.get(entry.path).then(count).then(cou => {
            return {
                name: entry.name,
                value: cou
            };
        });
    }
}