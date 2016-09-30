'use strict';
/**
Represent a part of a pattern.
A part can be either plain text (e.g. 'hello') or an annotator definition (e.g. '[en-type:number]')
@param text {String} the complete text of the pattern on which this component is defined (not the single component, the whole pattern)
@param start {Integer} the starting position of the component, including the '[' if present
@param end {Integer} the ending position of the component, including the ']' if present

*/
class PatternComponent {
  constructor(text, start, end) {
    this.complete_text = text;
    this.start = start;
    this.end = end || text.length;
  }
  /**
  the text covered by this component
  */
  get text() {
    return this.complete_text.substr(this.start, this.end);
  }
  /**
  the type of this component, null if it's plain text
  */
  get type() {
    if (!this.text.startsWith('['))
      return null;
    const i = this.text.indexOf(':');
    if (i === -1)
      return this.text.slice(1, -1);
    return this.text.substr(1, i - 1);
  }
  /**
  the parameter of this component, null if it's plain text and en empty string if pattern-less
  */
  get parameter() {
    if (!this.text.startsWith('['))
      return null;
    const i = this.text.indexOf(':');
    if (i === -1)
      return '';
    return this.text.slice(i + 1, -1);
  }
}
module.exports = function (pattern) {
  if (typeof pattern !== 'string') {
    throw new Error('the pattern was not a string');
  }
  let retVal = [];
  let last = 0;
  let openSquares = 0;
  for (let pos = 0; pos < pattern.length; pos = pos + 1) {
    if (pattern[pos] === '[') openSquares = openSquares + 1;
    if (pattern[pos] === ']') openSquares = openSquares - 1;
    if (pattern[pos] === '[' && openSquares === 1) {
      retVal.push(new PatternComponent(pattern, last, pos - last));
      last = pos;
    }
    if (pattern[pos] === ']' && openSquares === 0) {
      retVal.push(new PatternComponent(pattern, last, pos - last + 1 ));
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
