import msRest = require('ms-rest');
import { McClientOptions, IMcClient } from './common';
import {Promise} from 'es6-promise';

let defaultOptions: McClientOptions = {
    endpoint: "https://management.azure.com"
};

class McResource extends msRest.WebResource {
    constructor() {
        super();
        this.method = "GET";
        this.withHeader('client', 'mcResource');
    }

    method: string;
    url: string;
}

export class McClient extends msRest.ServiceClient implements IMcClient {
    constructor(options?: McClientOptions) {
        options = options || {};

        let credentials = null;
        if (options.clientId) {
            let msRestAzure = require('ms-rest-azure');
            credentials = new msRestAzure.ApplicationTokenCredentials(
                options.clientId,
                options.tenantId,
                options.secret);
        } else if (!options.endpoint) {
            options.endpoint = "http://doliluza1test.azurewebsites.net";
        }

        super(credentials);
        this.mcBaseUrl = options.endpoint || defaultOptions.endpoint;
    }

    mcBaseUrl: string;
    pipeline: any;

    get(path: string): Promise<Object> {
        let wr = new McResource();
        wr.url = this.mcBaseUrl + path;
        let pip = this.pipeline;

        return new Promise<Object>(function (resolve, reject) {
            pip(wr, function (err, response, body) {
                if (err) {
                    reject(err); return;
                }
                if (response.statusCode !== 200) {
                    let msg = {
                        code: response.statusCode,
                        body: body
                    };

                    reject(JSON.stringify(msg)); return;
                }

                try {
                    let obj = JSON.parse(body);
                    resolve(obj);
                } catch (err) {
                    reject(err); return;
                }
            });
        });
    }
}
