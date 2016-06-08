import mcClient = require('./mcClient');
import { McLib } from './mcLib';
import { McUtil } from './mcUtil';
import { McAdapter } from './adapter';
import { McClientOptions, IMcQueryEntry } from './common';

let conf: any = McUtil.LoadFile(__dirname + '/conf.json');
let queries: IMcQueryEntry[] = conf.list || [];
let options: McClientOptions = conf;
let client = new mcClient.McClient(options);
const mcLib = new McLib(client);
const mcAdapter = new McAdapter(mcLib);

mcAdapter.GetQueryOutput(queries).then(list => {
    for (let item of list) {
        console.log(item);
    }
}).catch(console.error);
