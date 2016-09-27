const chai = require('chai');
const expect = chai.expect;

const matcherjs = require('../');

describe ('pattern parser', function () {
  it ('considers a plain text string as an expression of length 1 containing itself', function () {
    const text = 'mary had a little lamb? Yes she totally did';
    const spl = matcherjs.parse_pattern(text);
    expect(spl.length).to.equal(1);
    expect(spl[0].text).to.equal(text);
    expect(spl[0].type).to.be.null;
    expect(spl[0].parameter).to.be.null;
  });
});
