'use strict';

const regexAnnotator = require('./lib/annotators/regex');
const insensitiveAnnotator = require('./lib/annotators/insensitive');
const charAnnotator = require('./lib/annotators/char');
const multiAnnotator = require('./lib/annotators/multi');
const tagAnnotator = require('./lib/annotators/tag');
const AnnotationHandler = require('./lib/annotation_handler');

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
  /**
  * get the annotator for a specifig rule name
  */
  getRule(ruleName) {
    return this.rules[ruleName];
  }
  /**
  * Run the annotator described in the annotator_description against the text, and return a promise which will give the results
  */
  annotate(text, annotator_description) {
    //plain text
    if (annotator_description.type === null) {
      return new Promise(function (fulfill) {
        let retVal = [];
        let scanPos = 0;
        let currentMatch = text.indexOf(annotator_description.text, scanPos);
        while (currentMatch !== -1) {
          retVal.push({
            span_start: currentMatch,
            span_end: currentMatch + annotator_description.text.length
          });
          currentMatch = text.indexOf(annotator_description.text, currentMatch + 1);
        }
        fulfill(retVal);
      });
    }
    //non-existent rule
    if (typeof this.rules[annotator_description.type] === 'undefined') {
      return new Promise((fulfill, reject) => { reject('the rule ' + annotator_description.type + ' is unknown'); });
    }
    //existent rule, annotate with it
    const ah = new AnnotationHandler();
    ah.setCurrentAnnotator(annotator_description.type);
    return this.rules[annotator_description.type].annotate(text, annotator_description.parameter, ah).then(() => {
      return Promise.resolve(ah.getAnnotationsFor(annotator_description.type));
    });
  }
}

module.exports.parse_pattern = require('./lib/pattern_parser');
module.exports.Matcher = Matcher;
