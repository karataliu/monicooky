import mcClient = require('./mcClient');
import { McLib } from './mcLib';
import { McUtil } from './mcUtil';
import { McAdapter } from './adapter';
import { McClientOptions, IMcQueryEntry, IMcClient } from './common';

const argv = require('minimist')(process.argv.slice(2));
const confPath = argv['c'] || __dirname + '/conf.json';
const queryTemplatePath = argv['t'] || __dirname + '/query.json';
const url = argv['u'];
let action = 'help';
if (argv['_'].length > 0) {
    action = argv['_'][0];
}

let client: IMcClient;

switch (action) {
    case 'discovery':
        getAdapter().GetSubscriptionsDiscovery().then(JSON.stringify).then(console.log).catch(console.error);
        break;
    case 'query':
        const mcAdapter = getAdapter();
        const query: any = McUtil.LoadFile(queryTemplatePath);
        let queries: IMcQueryEntry[] = query.list || [];
        let subsId: string[] = [];
        if (argv['s']) {
            subsId = argv['s'].split(',');
        }

        queries = McUtil.ExpandMacro(queries, "{subscriptionId}", subsId);
        mcAdapter.GetQueryOutput(queries).then(list => {
            for (let item of list) {
                console.log(item);
            }
        }).catch(console.error);
        break;
    case 'get':
        if (!url) {
            console.log("url must be set.");
        }
        getAdapter();
        client.get(url).then(console.log).catch(console.error);
        break;
    case 'help':
    default:
        console.log("node run.js <help|discovery|query|get> [-c conf.json] [-q queryTempalte.json] [-s subsId1,subsId2] [-u url]");
}

function getAdapter(): McAdapter {
    const conf: any = McUtil.LoadFile(confPath);
    const options: McClientOptions = conf;
    client = new mcClient.McClient(options);
    const mcLib = new McLib(client);
    return new McAdapter(mcLib);
}




