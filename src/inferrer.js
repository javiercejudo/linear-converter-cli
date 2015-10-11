'use strict';

const isUndefined = require('lodash.isundefined');
const isNotAlias = require('./aliases').isNotAlias;

const inferProperties = (synonyms, unit) => {
  return Object.keys(synonyms).filter(isNotAlias).reduce((properties, currentProperty) => {
    if (synonyms[currentProperty].hasOwnProperty(unit)) {
      properties.add(currentProperty);
    }

    return properties;
  }, new Set());
};

const inferProperty = (synonyms, unitFrom, unitTo) => {
  const candidatePropertiesFrom = inferProperties(synonyms, unitFrom);
  const candidatePropertiesTo = inferProperties(synonyms, unitTo);

  let properties = new Set();

  candidatePropertiesFrom.forEach((candidateProperty) => {
    if (candidatePropertiesTo.has(candidateProperty)) {
      properties.add(candidateProperty);
    }
  });

  return properties;
};

module.exports = (synonyms) => {
  return (program) => {
    if (isUndefined(program.property)) {
      return inferProperty(synonyms, program.from, program.to);
    }

    return new Set().add(program.property);
  };
};
