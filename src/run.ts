import mcClient = require('./mcClient');
import { McLib } from './mcLib';
import { McUtil } from './mcUtil';
import { McAdapter } from './adapter';
import { McClientOptions, IMcQueryEntry } from './common';

const conf: any = McUtil.LoadFile(__dirname + '/conf.json');
const query: any = McUtil.LoadFile(__dirname + '/query.json');

let queries: IMcQueryEntry[] = query.list || [];
let options: McClientOptions = conf;
const client = new mcClient.McClient(options);
const mcLib = new McLib(client);
const mcAdapter = new McAdapter(mcLib);

queries = McUtil.ExpandMacro(queries, "{subscriptionId}", ["s1"]);

mcAdapter.GetQueryOutput(queries).then(list => {
    for (let item of list) {
        console.log(item);
    }
}).catch(console.error);
