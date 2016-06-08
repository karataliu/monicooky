import { Promise } from 'es6-promise';
import { IMcClient, ISubscription } from '../src/common';
import { McAdapter } from '../src/adapter';

class MockClient implements IMcClient {
    get(path: string): Promise<Object> {
        return Promise.resolve({ value: [{}, {}] });
    }
    getWithQuery(path: string, query: string): Promise<string | number> {
        return Promise.resolve(2);
    }
    listSubscriptions(): Promise<ISubscription[]> {
        return Promise.resolve([{ id: "6d867431-f573-4e78-b658-10896020cff7", name: "d2" }]);
    }
}

describe("Adapter test GetSubscriptionsDiscovery", function () {
    let adapter = new McAdapter(new MockClient);

    it("test1", function (done) {
        adapter
            .GetSubscriptionsDiscovery()
            .then(function (result) {
                let list = result.data;
                expect(list.length).toBe(1);
                expect(list[0]).toEqual({
                    "{#SUBID}": "6d867431-f573-4e78-b658-10896020cff7",
                    "{#SUBNAME}": "d2"
                });
            })
            .then(done);
    });
});


describe("Adapter testEntry To String", function () {
  it("test Convert 1", function () {
    expect(McAdapter.entryToString(
      { name: "a", value: 1 }
    )).toEqual("- a 1");
  });
  it("test Convert 2", function () {
    expect(McAdapter.entryToString(
      { name: "b", value: "s1" }
    )).toEqual(
      "- b \"s1\""
    );
  });
});
