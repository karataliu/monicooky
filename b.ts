import lib = require('./a');

function errlog(data){
    console.error("error:" + data);
    process.exit(1);
}

function count(data){
    var arr = data['value'];
    console.log(arr.length);
}

let conf = require('./conf.json');
let path = conf.path;
let options: lib.McClientOptions = conf;
let client = new lib.McClient(options);
client.get(path).then(count).catch(errlog);