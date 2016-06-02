import lib = require('./a');

function errlog(data){
    console.log("error:" + data);
}

let path = "/subscriptions/test/resourceGroups";
let client = new lib.McClient();
client.get(path).then(console.log).catch(errlog);