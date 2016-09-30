const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const matcherjs = require('../');

describe ('built-in annotations', function () {
  it ('check that there are the built-in annotators', function () {
    expect(matcherjs.rules['r']).to.not.be.undefined;
    expect(matcherjs.rules['i']).to.not.be.undefined;
    expect(matcherjs.rules['char']).to.not.be.undefined;
    expect(matcherjs.rules['multi']).to.not.be.undefined;
    expect(matcherjs.rules['tag']).to.not.be.undefined;
  });
  it ('check that there are not other annotaros which are not the built-in', function () {
    expect(matcherjs.rules['hello']).to.be.undefined;
    expect(matcherjs.rules['zebra']).to.not.be.undefined;
    expect(matcherjs.rules['ir']).to.not.be.undefined;
    expect(matcherjs.rules['ri']).to.not.be.undefined;
    expect(matcherjs.rules['Char']).to.not.be.undefined;
    expect(matcherjs.rules['MULTI']).to.not.be.undefined;
  });
});
