import { IMcClient, ISubscription } from '../src/common';
import { McLib } from '../src/mcLib';
import { Promise } from 'es6-promise';

class MockClient implements IMcClient {
    get(path: string): Promise<Object> {
        if (path.indexOf("/subscriptions?") === 0) {
            return Promise.resolve({
                value: [
                    { subscriptionId: "6d867431-f573-4e78-b658-10896020cff7", displayName: "d2" }
                ]
            });
        } else if (path.indexOf("/subscriptions/") === 0) {
            return Promise.resolve({ value: [{}, {}] });
        }

        return Promise.reject(404);
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
    let mcLib: McLib;

    beforeEach(() => {
        mcLib = new McLib(client);
    });

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

    it("test executeQuery", function (done) {
        McLib.executeQuery(client, urls[0]).then(function (result) {
            expect(result).toEqual({ name: "azure.rgcount", value: 2, });
            done();
        });
    });

    it("test executeQueries", function (done) {
        mcLib.executeQueries(urls).then(function (dat) {
            expect(dat.list).toEqual([
                { name: "azure.rgcount", value: 2, },
                { name: "azure.rgcount1", value: 2, },
            ]);
        }).catch(function (err) {
            fail(err);
        }).then(done);
    });

    it("test executeQueries with 404 case.", function (done) {
        // let newUrls = urls.();
        const newUrls = [
    {
        name: "azure.rgcount",
        path: "/subscriptions/test/resourceGroups?api-version=2014-04-01"
    },
    {
            name: "azure.unknown",
            path: "/r404"
        },
    {
        name: "azure.rgcount1",
        path: "/subscriptions/test/resourceGroups?api-version=2014-04-01"
    },
];

        mcLib.executeQueries(newUrls).then(function (dat) {
            expect(dat.list).toEqual([
                { name: "azure.rgcount", value: 2, },
                { name: "azure.rgcount1", value: 2, },
            ]);
        }).catch(function (err) {
            fail(err);
        }).then(done);
    });
});
