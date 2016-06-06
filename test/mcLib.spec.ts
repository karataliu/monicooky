import run from '../src/mcLib';
import { IMcClient } from '../src/mcClient';
import { Promise } from 'es6-promise';

class MockClient implements IMcClient {
    get(path: string): Promise<Object> {
        return Promise.resolve({ value: [ {}, {}]});
    }
}

const client = new MockClient();

describe("Lib test", function () {
    it("test 1", function (done) {
        run(client).then(function(dat){
            expect(dat).toEqual({ a1: 2 });
        }).then(done);
    });
});
