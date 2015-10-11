'use strict';

const isUndefined = require('lodash.isundefined');

module.exports = (synonyms) => {
  return (program) => {
    let property = program.property;

    if (!isUndefined(property)) {
      return property;
    }

    Object.keys(synonyms).some((currentProperty) => {
      const found = synonyms[currentProperty].hasOwnProperty(program.from);

      if (found) {
        property = currentProperty;
      }

      return found;
    });

    return property;
  };
};
