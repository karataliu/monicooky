async function runWithDelay(time: number, callback: Function): Promise<void> {
    while (1) {
        callback();
        await delay(time * 1000);
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


import lib = require('./a');

function errlog(data) {
    console.error("error:" + data);
    process.exit(1);
}

function count(data) {
    let arr = data['value'];
    return arr.length;
}

let conf = require('./conf.json');
let path = conf.path;
let options: lib.McClientOptions = conf;
let client = new lib.McClient(options);


runWithDelay(3, function () {
    const spawn = require('child_process').spawn;

    client.get(path).catch(errlog).then(count).then(function (cou) {
        console.log('result:' + cou);
        const ls = spawn('zabbix_sender', ['-c', '/etc/zabbix/zabbix_agentd.conf', '-k', 'azure.rgcount', '-o', cou]);
        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    });
});