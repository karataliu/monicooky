import { Promise } from 'es6-promise';
import { IMcClient, IDiscoveryResult, ISubscription, IMcResultEntry, IMcLib } from './common';

export class McAdapter {
    private mclib: IMcLib;

    constructor(mclib: IMcLib) {
        this.mclib = mclib;
    }

    GetSubscriptionsDiscovery(): Promise<IDiscoveryResult> {
        return this.mclib.listSubscriptions().then(McAdapter.subscriptionsToDiscoveryResult);
    }

    static entryToString(entry: IMcResultEntry): string {
        let value = entry.value;
        if (typeof value === 'string') {
            value = `"${value}"`;
        }

        return `- ${entry.name} ${value}`;
    }

    // Convert from json object to zabbix sender input file. host default to '-'
    static convertSenderInput(list: IMcResultEntry[]): string[] {
        return list.map(McAdapter.entryToString);
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