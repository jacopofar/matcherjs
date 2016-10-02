'use strict';
module.exports = {
  annotate: function (text, parameter, ah) {
    return new Promise(function (fulfill) {
      const lower_text = text.toLowerCase();
      const lower_key = parameter.toLowerCase();
      let scanPos = 0;
      let currentMatch = lower_text.indexOf(lower_key, scanPos);
      while (currentMatch !== -1) {
        ah.addAnnotation(currentMatch, currentMatch + lower_key.length);
        currentMatch = lower_text.indexOf(lower_key, currentMatch + 1);
      }
      fulfill();
    });
  }
};
