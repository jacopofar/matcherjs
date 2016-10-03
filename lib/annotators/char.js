'use strict';
module.exports = {
  annotate: function (text, parameter, ah) {
    return new Promise(function (fulfill, reject) {
      //surrogate pairs (e.g.: emoticons) are supported, too
      try {
        const key = String.fromCodePoint(parseInt(parameter));
        let scanPos = 0;
        let currentMatch = text.indexOf(key, scanPos);
        while (currentMatch !== -1) {
          //key can be of length 1 or 2
          ah.addAnnotation(currentMatch, currentMatch + key.length);
          currentMatch = text.indexOf(key, currentMatch + 1);
        }
        fulfill();
      } catch (e) {
        //maybe it wasn't a number, it's a negative value or is just too high to be a code point
        reject('invalid code point definition "' + parameter + '"' + e);
      }
    });
  }
};
