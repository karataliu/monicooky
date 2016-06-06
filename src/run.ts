import mcClient = require('./mcClient');
import run from './mcLib';
import { McUtil } from './mcUtil';
import { McClientOptions, IMcQueryEntry } from './common';

let conf: any = McUtil.LoadFile(__dirname + '/conf.json');
let query: IMcQueryEntry[] = conf.list;
let options: McClientOptions = conf;
let client = new mcClient.McClient(options);

run(client, query).then(result => {
    let list = McUtil.ConvertSenderInput(result.list);
    for (let item of list){
        console.log(item);
    }
}).catch(console.error);
