import mcClient = require('../src/mcClient');

function count(data) {
    let arr = data['value'];
    return arr.length;
}

let conf = {
    "tenantId": "",
    "clientId": "",
    "secret": "",
    "path": "/subscriptions/test/resourceGroups?api-version=2014-04-01"
};

let path = conf.path;
let options: mcClient.McClientOptions = conf;
let client = new mcClient.McClient(options);

describe("Client test", function () {
    it("test 1", function (done) {
        let t1 = client.get(path).then(count);
        t1.then(function(dat){
            expect(dat).toBe(1);
        }).then(done);
    });
});
