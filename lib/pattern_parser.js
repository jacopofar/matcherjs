'use strict';
/**

*/
class PatternComponent {
  constructor(text, start, end) {
    this.complete_text = text;
    this.start = start;
    this.end = end || text.length;
  }
  get text() {
    return this.complete_text.substr(this.start, this.end);
  }
  get type() {
    return null;
  }
  get parameter() {
    return null;
  }


}
module.exports = function (pattern) {
  if (typeof pattern !== 'string') {
    throw new Error('the pattern was not a string');
  }
  let retVal = [];
  let last = 0;
  let openSquares = 0;
  for (let pos in pattern) {
    if (pattern[pos] === '[') openSquares++;
    if (pattern[pos] === ']') openSquares--;

    if (pattern[pos] === '[' && openSquares === 1) {
      retVal.push(new PatternComponent(pattern, last, pos));
      last = pos;
    }
    if (pattern[pos] === ']' && openSquares === 0) {
      retVal.push(new PatternComponent(pattern, last, pos + 1 ));
      last = pos + 1;
    }
  }
  if (openSquares !== 0) {
    //the last pattern was a "fake" one, for example 'aB[r:x'
    //it is very likely an user error, refuse it
    throw new Error(`Square brackets are unbalanced in pattern "${pattern}"`);
  }
  retVal.push(new PatternComponent(pattern, last));
  return retVal;
};
