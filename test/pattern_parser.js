'use strict';
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
  it ('split patterns into parts correctly', function () {
    const text = 'this [is:a] pattern [with:parts]!';
    const spl = matcherjs.parse_pattern(text);
    expect(spl.length).to.equal(5);
    expect(spl[0].text).to.be.equal('this ');
    expect(spl[1].text).to.be.equal('[is:a]');
    expect(spl[2].text).to.be.equal(' pattern ');
    expect(spl[3].text).to.be.equal('[with:parts]');
    expect(spl[4].text).to.be.equal('!');
  });
  it ('throw errors with bad-formed patterns', function () {
    const text = 'this [is:a] broken [pattern!';
    assert.throws(() => matcherjs.parse_pattern(text), Error, 'Square brackets are unbalanced in pattern');
  });

  it ('identifies types and parameters correctly', function () {
    const text = 'this [is:another] pattern [with: parametric parts] and [non] parametric ones!';
    const spl = matcherjs.parse_pattern(text);
    expect(spl.length).to.equal(7);
    expect(spl[0].text).to.be.equal('this ');

    expect(spl[1].text).to.be.equal('[is:another]');
    expect(spl[1].type).to.be.equal('is');
    expect(spl[1].parameter).to.be.equal('another');

    expect(spl[2].text).to.be.equal(' pattern ');

    expect(spl[3].text).to.be.equal('[with: parametric parts]');
    expect(spl[3].type).to.be.equal('with');
    expect(spl[3].parameter).to.be.equal(' parametric parts');

    expect(spl[5].text).to.be.equal('[non]');
    expect(spl[5].type).to.be.equal('non');
    expect(spl[5].parameter).to.be.equal('');
  });
});
