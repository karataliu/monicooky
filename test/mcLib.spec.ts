import run from '../src/mcLib';
import { IMcClient, ISubscription } from '../src/common';
import { McLib } from '../src/mcLib';
import { Promise } from 'es6-promise';

class MockClient implements IMcClient {
    get(path: string): Promise<Object> {
        if (path === "/subscriptions") {
            return Promise.resolve({
                value: [
                    { subscriptionId: "6d867431-f573-4e78-b658-10896020cff7", displayName: "d2" }
                ]
            });
        }

        return Promise.resolve({ value: [{}, {}] });
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
    it("test run", function (done) {
        run(client, urls).then(function (dat) {
            expect(dat.list).toEqual([
                { name: "azure.rgcount", value: 2, },
                { name: "azure.rgcount1", value: 2, },
            ]);
        }).catch(function (err) {
            fail(err);
        }).then(done);
    });
});

describe("Lib tests", function () {
    let mcLib = new McLib(client);

    it("test listSubs", function (done) {
        mcLib.listSubscriptions().then(function (list) {
            expect(list.length).toBe(1);
            expect(list).toEqual([
                { id: "6d867431-f573-4e78-b658-10896020cff7", name: "d2" }
            ]);
            done();
        }).catch(function (err) {
            fail(err);
            done();
        });
    });

    fit("test executeQuery", function (done) {
        mcLib.executeQuery(urls[0]).then(function (result) {
            expect(result).toEqual({ name: "azure.rgcount", value: 2, });
            done();
        });
    });
});
