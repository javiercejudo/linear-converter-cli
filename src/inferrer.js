'use strict';

const isUndefined = require('lodash.isundefined');
const pick = require('lodash.pick');
const isNotAlias = require('./aliases').isNotAlias;

let emitter = require('./eventEmitter');

const inferProperties = (candidates, unit) => {
  return Object.keys(candidates).filter(isNotAlias).reduce((properties, currentProperty) => {
    if (candidates[currentProperty].hasOwnProperty(unit)) {
      emitter.emit('log', `Inferred unit match: ${unit} => ${candidates[currentProperty][unit]} (${currentProperty})`);
      properties.add(currentProperty);
    }

    return properties;
  }, new Set());
};

const inferProperty = (synonyms, unitFrom, unitTo) => {
  const candidatePropertiesFrom = inferProperties(synonyms, unitFrom);
  const candidatePropertiesTo = inferProperties(pick(synonyms, Array.from(candidatePropertiesFrom)), unitTo);

  let properties = new Set();

  candidatePropertiesFrom.forEach((candidateProperty) => {
    if (candidatePropertiesTo.has(candidateProperty)) {
      properties.add(candidateProperty);
    }
  });

  emitter.emit('log', `Inferred property: ${Array.from(properties).join(', ') || '-'}`);

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
