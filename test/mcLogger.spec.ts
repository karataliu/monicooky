import { McLogger } from '../src/mcLogger';
import fs = require('fs');

describe("Logger test", function () {
  it("test log 1", function (done) {
    const filename = "a.log";
    fs.unlink(filename, function (err) {
      let logger = new McLogger(filename);
      logger.log('line1');
      logger.log('line2');
      let lc = 0;

      fs.createReadStream(filename)
        .on('data', function (chunk) {
          for (let i = 0; i < chunk.length; ++i)
            if (chunk[i] === 10) lc++;
        })
        .on('end', function () {
          expect(lc).toBe(2);
          done();
        });
    });
  });
});
