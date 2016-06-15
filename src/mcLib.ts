// use client to gain data, then convert to plain object.
import { IMcClient, IMcQueryEntry, IMcResult, ISubscription, IMcResultEntry, IMcLib } from './common';
import { Promise } from 'es6-promise';

function count(data): number {
    let arr = data['value'];
    return arr.length;
}

export class McLib implements IMcLib {
    private client: IMcClient;

    constructor(client: IMcClient) {
        this.client = client;
    }

    listSubscriptions(): Promise<ISubscription[]> {
        return this.client.get("/subscriptions?api-version=2014-04-01").then(function (data: any) {
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

    static executeQuery(client: IMcClient, entry: IMcQueryEntry): Promise<IMcResultEntry> {
        return client.get(entry.path).then(count).then(cou => {
            return {
                name: entry.name,
                value: cou
            };
        });
    }

    executeQueries(queries: IMcQueryEntry[]): Promise<IMcResult> {
        let base: Promise<void> = Promise.resolve();
        let result1: IMcResult = { list: [] };

        let cli = this.client;
        for (let entry of queries) {
            base = base.then(() => {
                return McLib.executeQuery(cli, entry).then(function (resultEntry) {
                    result1.list.push(resultEntry);
                });
            }).catch(err => {
                // console.error("Error found:" + err);
            });
        }

        return base.then(() => result1);
    }
}