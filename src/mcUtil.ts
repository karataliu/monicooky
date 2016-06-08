import { McClientOptions, IMcResultEntry } from './common';
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
}
