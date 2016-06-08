import { McClientOptions, IMcResultEntry, IMcQueryEntry} from './common';
import fs = require('fs');

export class McUtil {
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

    static ExpandMacro(input: IMcQueryEntry[], macro: string, values: string[]): IMcQueryEntry[] {
        const output: IMcQueryEntry[] = [];
        const needExpand: IMcQueryEntry[] = [];
        for (let item of input) {
            if (item.name.indexOf(macro) === -1) {
                output.push(item);
            } else {
                needExpand.push(item);
            }
        }

        for (let value of values) {
            for (let item of needExpand) {
                let newItem: IMcQueryEntry = {
                    name: item.name.replace(macro, value),
                    path: item.path.replace(macro, value),
                };
                if (item.query) {
                    newItem.query = item.query;
                }

                output.push(newItem);
            }
        }

        return output;
    }
}
