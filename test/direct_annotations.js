const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const matcherjs = require('../');

describe ('built-in annotations', function () {
  it ('check that there are the built-in annotators', function () {
    const matcher = new matcherjs.Parser();
    expect(matcher.getRule('r')).to.not.be.undefined;
    expect(matcher.getRule('i')).to.not.be.undefined;
    expect(matcher.getRule('char')).to.not.be.undefined;
    expect(matcher.getRule('multi')).to.not.be.undefined;
    expect(matcher.getRule('tag')).to.not.be.undefined;
  });
  it ('check that there are not other annotaros which are not the built-in', function () {
    const matcher = new matcherjs.Parser();
    expect(matcher.getRule('hello')).to.be.undefined;
    expect(matcher.getRule('zebra')).to.be.undefined;
    expect(matcher.getRule('ir')).to.be.undefined;
    expect(matcher.getRule('ri')).to.be.undefined;
    expect(matcher.getRule('Char')).to.be.undefined;
    expect(matcher.getRule('MULTI')).to.be.undefined;
  });
});
