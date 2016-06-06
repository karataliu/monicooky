"use strict";
var mcUtil_1 = require('../src/mcUtil');
describe("Util test", function () {
    it("test Convert", function () {
        var a = mcUtil_1.McUtil.ConvertSenderInput({});
        console.log(a);
        expect(a).toBe('- db.error "Linux DB3 down"');
    });
});
