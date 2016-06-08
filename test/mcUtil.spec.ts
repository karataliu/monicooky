import { McUtil } from '../src/mcUtil';

const input = [
    {
        name: "check[{sub1}]",
        path: "/subscriptions/{sub1}/r0?api-version=2014-04-01"
    },
    {
        name: "check[{sub1}]",
        path: "/subscriptions/{sub1}/r1?api-version=2014-04-01"
    },
    {
        name: "n1",
        path: "p1"
    },
];


describe("test Util", () => {
    it("test1", () => {
        let newInput = McUtil.ExpandMacro(input, "{sub1}", ["a1", "b2"]);
        expect(newInput).toEqual(
            [
                {
                    name: "n1",
                    path: "p1",
                },
                {
                    name: "check[a1]",
                    path: "/subscriptions/a1/r0?api-version=2014-04-01",
                },
                {
                    name: "check[a1]",
                    path: "/subscriptions/a1/r1?api-version=2014-04-01",
                },
                {
                    name: "check[b2]",
                    path: "/subscriptions/b2/r0?api-version=2014-04-01",
                },
                {
                    name: "check[b2]",
                    path: "/subscriptions/b2/r1?api-version=2014-04-01",
                },
            ]
        );
    });
});