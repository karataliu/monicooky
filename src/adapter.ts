import { IMcClient, IDiscoveryResult, ISubscription, IMcResultEntry } from './common';
import {Promise} from 'es6-promise';

export class McAdapter {
    private client: IMcClient;

    constructor(client: IMcClient) {
        this.client = client;
    }

    GetSubscriptionsDiscovery(): Promise<IDiscoveryResult> {
        return this.client.listSubscriptions().then(McAdapter.subscriptionsToDiscoveryResult);
    }

    static entryToString(entry: IMcResultEntry): string {
        let value = entry.value;
        if (typeof value === 'string') {
            value = `"${value}"`;
        }

        return `- ${entry.name} ${value}`;
    }

    private static subscriptionsToDiscoveryResult(subscriptions: ISubscription[]): IDiscoveryResult {
        let list = [];
        for (let subscription of subscriptions) {
            list.push({
                "{#SUBID}": subscription.id,
                "{#SUBNAME}": subscription.name,
            });
        }

        return { data: list };
    }
};