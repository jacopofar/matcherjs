'use strict';

const regexAnnotator = require('./lib/annotators/regex');
const insensitiveAnnotator = require('./lib/annotators/insensitive');
const charAnnotator = require('./lib/annotators/char');
const multiAnnotator = require('./lib/annotators/multi');
const tagAnnotator = require('./lib/annotators/tag');

class Matcher {
  constructor() {
    this.rules = {
      r: regexAnnotator,
      i: insensitiveAnnotator,
      char: charAnnotator,
      multi: multiAnnotator,
      tag: tagAnnotator
    };
  }
  getRule(ruleName) {
    return this.rules[ruleName];
  }
}

module.exports.parse_pattern = require('./lib/pattern_parser');
module.exports.Matcher = Matcher;
