'use strict';
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const matcherjs = require('../');

describe ('presence of built-in annotations', function () {
  it ('check that there are the built-in annotators', function () {
    const matcher = new matcherjs.Matcher();
    expect(matcher.getRule('r')).to.not.be.undefined;
    expect(matcher.getRule('i')).to.not.be.undefined;
    expect(matcher.getRule('char')).to.not.be.undefined;
    expect(matcher.getRule('multi')).to.not.be.undefined;
    expect(matcher.getRule('tag')).to.not.be.undefined;
  });
  it ('check that there are no other annotators when initializing a parser', function () {
    const matcher = new matcherjs.Matcher();
    expect(matcher.getRule('hello')).to.be.undefined;
    expect(matcher.getRule('zebra')).to.be.undefined;
    expect(matcher.getRule('ir')).to.be.undefined;
    expect(matcher.getRule('ri')).to.be.undefined;
    expect(matcher.getRule('Char')).to.be.undefined;
    expect(matcher.getRule('MULTI')).to.be.undefined;
  });

  it ('case-insensitive annotator annotate case-insensitive strings', function () {
    const matcher = new matcherjs.Matcher();
    const annotator = matcherjs.parse_pattern('[i:a TeXt]')[0];
    matcher.annotate('this is A TEXT', annotator).then((annotations) => {
      assert(annotations.length === 1, 'there should be exactly 1 annotation, found ' + annotations.length);
      expect(annotations[0].text).to.be.equal('A TEXT');
      expect(annotations[0].span_start).to.be.equal(8);
      expect(annotations[0].span_end).to.be.equal(14);
      expect(annotations[0].annotation).to.be.undefined;
    });
  });
});
