import msRest = require('ms-rest');

export interface McClientOptions {
    endpoint?:  string;
    tenantId?:  string;
    clientId?:  string;
    secret?:    string;
}

var defaultOptions: McClientOptions = {
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

export class McClient extends msRest.ServiceClient {
    constructor(options?: McClientOptions) {
        options = options || {};

        var credentials = null;
        if(options.clientId){
            var msRestAzure = require('ms-rest-azure');
            var credentials = new msRestAzure.ApplicationTokenCredentials(
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
        var wr = new McResource();
        wr.url = this.mcBaseUrl + path;
        var pip = this.pipeline;

        return new Promise<Object>(function (resolve, reject) {
            pip(wr, function (err, response, body) {
                if(err){
                    reject(err);return;
                }
                if(response.statusCode !== 200){
                    var msg = {
                        code: response.statusCode,
                        body: body
                    };
                    
                    reject(JSON.stringify(msg));return;
                }

                try{
                    var obj = JSON.parse(body);
                    resolve(obj);
                }catch(err){
                    reject(err);return;
                }
            });
        });
    }
}
