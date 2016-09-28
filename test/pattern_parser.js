const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const matcherjs = require('../');

describe ('pattern parser', function () {
  it ('considers a plain text string as an expression of length 1 containing itself', function () {
    const text = 'mary had a little lamb? Yes she totally did';
    const spl = matcherjs.parse_pattern(text);
    expect(spl.length).to.equal(1);

    expect(spl[0].text).to.be.equal(text);
    assert.isNull(spl[0].type, 'the type for a plain text pattern was not null');
    assert.isNull(spl[0].parameter, 'the parameter for a plain text pattern was not null');
  });
});
