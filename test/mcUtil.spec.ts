import { McUtil } from '../src/mcUtil';

describe("Util ConvertSenderInput", function() {
  it("test Convert", function() {
    let a = McUtil.ConvertSenderInput({});
    console.log(a);
    expect(a).toBe('- db.error "Linux DB3 down"');
  });
});