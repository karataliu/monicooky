import { McUtil } from '../src/mcUtil';

describe("Util ConvertSenderInput", function () {
  it("test Convert 0", function () {
    expect(McUtil.ConvertSenderInput([])).toEqual([]);
  });
  it("test Convert 1", function () {
    expect(McUtil.ConvertSenderInput([
      { name: "a", value: 1 }
    ])).toEqual(["- a 1"]);
  });
  it("test Convert 2", function () {
    expect(McUtil.ConvertSenderInput([
      { name: "a", value: 1 },
      { name: "b", value: "s1" },
    ])).toEqual([
      "- a 1",
      "- b \"s1\"",
    ]);
  });
  it("test Convert Mutiple", function () {
    expect(McUtil.ConvertSenderInput([
      { name: "db.ping", value: 1 },
      { name: "db.status", value: 0 },
      { name: "db.error", value: "Linux DB3 down" },
    ])).toEqual([
      "- db.ping 1",
      "- db.status 0",
      "- db.error \"Linux DB3 down\"",
    ]);
  });
});
