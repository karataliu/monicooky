import msRest = require('ms-rest');

class McClientOptions {
    endpoint = "http://doliluza1test.azurewebsites.net";
}

class McResource extends msRest.WebResource {
    constructor() {
        super();
        this.method = "GET";
    }

    method: string;
    url: string;
}

export class McClient extends msRest.ServiceClient {
    constructor(options?: McClientOptions) {
        super();
        options = options || new McClientOptions();
        
        this.mcBaseUrl = options.endpoint;
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
                    reject('code');return;
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
