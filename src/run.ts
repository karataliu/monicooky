import mcClient = require('./mcClient');
import run from './mcLib';
import { McUtil } from './mcUtil';
import { McClientOptions, IMcQueryEntry } from './common';

let conf = McUtil.LoadFile(__dirname + '/conf.json');

let options: McClientOptions = conf;
let client = new mcClient.McClient(options);

run(client, [
    { name: "azure.rgcount", path: "/subscriptions/test/resourceGroups?api-version=2014-04-01" }
]).then(result => {
    let list = McUtil.ConvertSenderInput(result.list);
    for (let item of list){
        console.log(item);
    }
}).catch(console.error);
