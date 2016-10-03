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

  it ('case-insensitive annotator annotates case-insensitive strings', function () {
    const matcher = new matcherjs.Matcher();
    const annotator = matcherjs.parse_pattern('[i:a TeXt]')[0];
    const text = 'this is A TEXT';
    return matcher.annotate(text, annotator).then((annotations) => {
      assert(annotations.length === 1, 'there should be exactly 1 annotation, found ' + annotations.length);
      expect(text.slice(annotations[0].span_start, annotations[0].span_end)).to.be.equal('A TEXT');
      expect(annotations[0].span_start).to.be.equal(8);
      expect(annotations[0].span_end).to.be.equal(14);
      expect(annotations[0].annotation).to.be.undefined;
    }).catch((err) => {
      assert(false, 'error in annotator: ' + err);
    });
  });
  it ('char annotator annotates characters', function () {
    const matcher = new matcherjs.Matcher();
    const annotator = matcherjs.parse_pattern('[char:39617]')[0];
    const text = 'see? 髁 is the character U+9AC1 (39617 in decimal)';
    return matcher.annotate(text, annotator).then((annotations) => {
      assert(annotations.length === 1, 'there should be exactly 1 annotation, found ' + annotations.length);
      expect(text.slice(annotations[0].span_start, annotations[0].span_end)).to.be.equal('髁');
      expect(annotations[0].span_start).to.be.equal(5);
      expect(annotations[0].span_end).to.be.equal(6);
      expect(annotations[0].annotation).to.be.undefined;
    }).catch((err) => {
      assert(false, 'error in annotator: ' + err);
    });
  });

  it ('char annotator annotates surrogate pairs, too', function () {
    const matcher = new matcherjs.Matcher();
    const annotator = matcherjs.parse_pattern('[char:0x1F601]')[0];
    const text = 'see? 😁 is the character U+1F601 (128513 in decimal), and it produces two UTF-16 codepoints, 0xD83D and 0xDE01';
    return matcher.annotate(text, annotator).then((annotations) => {
      assert(annotations.length === 1, 'there should be exactly 1 annotation, found ' + annotations.length);
      expect(text.slice(annotations[0].span_start, annotations[0].span_end)).to.be.equal('😁');
      expect(annotations[0].span_start).to.be.equal(5);
      expect(annotations[0].span_end).to.be.equal(7);
      expect(annotations[0].annotation).to.be.undefined;
    }).catch((err) => {
      assert(false, 'error in annotator: ' + err);
    });
  });
});
