import { IMcResultEntry } from './mcLib';

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
}
