import mcClient = require('../src/mcClient');
import { McClientOptions } from '../src/common';

function count(data) {
    let arr = data['value'];
    return arr.length;
}

let conf = {
    "tenantId": "",
    "clientId": "",
    "secret": "",
};

let path =  "/subscriptions/test/resourceGroups?api-version=2014-04-01";
let options: McClientOptions = conf;
let client = new mcClient.McClient(options);

describe("Client test", function () {
    it("test get", function (done) {
        let t1 = client.get(path).then(count);
        t1.then(function(dat){
            expect(dat).toBe(2);
        }).then(done);
    });
});
