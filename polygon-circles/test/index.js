// TODO: Mocha?
const onInvoke = require("../")();

const testCases = ["one"];

testCases.forEach(testCase => {
  const input = require(`./${testCase}.input.js`);
  const output = JSON.stringify(require(`./${testCase}.output.js`));

  function getValue(key) {
    if (input[key]) {
      return input[key];
    }
  }
  
  function setValue(key, value) {
    if (key === "geojson") {
      console.log(`Test case ${testCase} ${value === output ? "succeeded": "failed"}`);
    }
  }

  onInvoke({}, getValue, setValue);
});