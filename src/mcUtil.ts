export class McUtil {
    // Convert from json object to zabbix sender input file. host default to '-'
    static ConvertSenderInput(obj: Object): string[] {
        let result = [];
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let value = obj[key];
                if (typeof value === 'string'){
                    value = `"${value}"`;
                }

                result.push(`- ${key} ${value}`);
            }
        }

        return result;
    }
}
