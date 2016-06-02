async function runWithDelay(time: number, callback: Function): Promise<void> {
    while (1) {
        callback();
        await delay(time * 1000);
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

runWithDelay(3, function () {
    const spawn = require('child_process').spawn;
    const ls = spawn('zabbix_sender', ['-c', '/etc/zabbix/zabbix_agentd.conf', '-k', 'azure.rgcount', '-o', '5']);
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