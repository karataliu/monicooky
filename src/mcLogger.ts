import { IMcLogger } from './common';
import fs = require('fs');
import { EOL } from 'os';

export class McLogger implements IMcLogger {
    fd: fs.WriteStream;

    constructor(path?: string) {
        this.fd = undefined;
        if (path) {
            this.fd = fs.createWriteStream(path, { flags: 'a' });
        }
    }

    log(message: string): void {
        if (this.fd) {
            this.fd.write(message);
            this.fd.write(EOL);
        } else {
            console.log(message);
        }
    }
}