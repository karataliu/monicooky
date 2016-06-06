import run from '../src/mcLib';

describe("Lib test", function () {
    it("test 1", function (done) {
        run().then(function(dat){
            expect(dat).toEqual({ a1: 1 });
        }).then(done);
    });
});
