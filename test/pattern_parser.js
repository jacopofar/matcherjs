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
});
