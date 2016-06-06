import run from '../src/mcLib';
import { IMcClient } from '../src/common';
import { Promise } from 'es6-promise';

class MockClient implements IMcClient {
    get(path: string): Promise<Object> {
        return Promise.resolve({ value: [ {}, {}]});
    }
}

const client = new MockClient();

const urls = [
    {
        name: "azure.rgcount",
        path: "/subscriptions/test/resourceGroups?api-version=2014-04-01"
    },
    {
        name: "azure.rgcount1",
        path: "/subscriptions/test/resourceGroups?api-version=2014-04-01"
    },
];

describe("Lib test", function () {
    it("test 1", function (done) {
        run(client, urls).then(function(dat){
            expect(dat.list).toEqual([
                {  name: "azure.rgcount", value: 2, },
                {  name: "azure.rgcount1", value: 2, },
            ]);
        }).catch(function(err){
            fail(err);
        }).then(done);
    });
});
