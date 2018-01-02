// do not run directly, run via npm/yarn or from Mocha

const onInvoke = require("../")();

function assertPromise(promise, test, message) {
  if (test) {
    promise.resolve();
  } else {
    promise.reject(new Error(message));
  }
}

const testCases = ["one"];

describe("Output tests", () => {
  testCases.forEach(testCase => {
    it(testCase, () => {
      return new Promise((resolve, reject) => {
        const input = require(`./${testCase}.input.js`);
        const output = JSON.stringify(require(`./${testCase}.output.js`));
      
        function getValue(key) {
          if (input[key]) {
            return input[key];
          }
        }
        
        function setValue(key, value) {
          if (key === "geojson") {
            const message = `Output from test ${testCase} does not match expected output!`;
            assertPromise({ resolve, reject }, value === output, message);
          }
        }
      
        onInvoke({}, getValue, setValue);
      });
    });
  });
});