import { IMcResultEntry } from './mcLib';
import { McClientOptions } from './mcClient';
import fs = require('fs');

export class McUtil {
    // Convert from json object to zabbix sender input file. host default to '-'
    static ConvertSenderInput(list: IMcResultEntry[]): string[] {
        let result = [];
        for (let item of list) {
            let value = item.value;
            if (typeof value === 'string') {
                value = `"${value}"`;
            }

            result.push(`- ${item.name} ${value}`);
        }

        return result;
    }

    static LoadFile<T>(path: string): T {
        let conf: T;
        try {
            fs.statSync(path);
            conf = require(path);
        } catch (err) {
            console.error(err);
            return conf;
        }

        return conf;
    }
}
