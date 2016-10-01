'use strict';
const chai = require('chai');
const expect = chai.expect;

const matcherjs = require('../');

describe ('presence of built-in annotations', function () {
  it ('check that there are the built-in annotators', function () {
    const matcher = new matcherjs.Parser();
    expect(matcher.getRule('r')).to.not.be.undefined;
    expect(matcher.getRule('i')).to.not.be.undefined;
    expect(matcher.getRule('char')).to.not.be.undefined;
    expect(matcher.getRule('multi')).to.not.be.undefined;
    expect(matcher.getRule('tag')).to.not.be.undefined;
  });
  it ('check that there are no other annotators when initializing a parser', function () {
    const matcher = new matcherjs.Parser();
    expect(matcher.getRule('hello')).to.be.undefined;
    expect(matcher.getRule('zebra')).to.be.undefined;
    expect(matcher.getRule('ir')).to.be.undefined;
    expect(matcher.getRule('ri')).to.be.undefined;
    expect(matcher.getRule('Char')).to.be.undefined;
    expect(matcher.getRule('MULTI')).to.be.undefined;
  });
});
