import { McClientOptions, IMcResultEntry } from './common';
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

    static LoadFile(path: string) {
        let conf = {};
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
