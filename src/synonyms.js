'use strict';

const identitySynonyms = (conversions) => {
  return Object.keys(conversions).reduce((synonyms, unit) => {
    synonyms[unit] = unit;

    return synonyms;
  }, {});
};

var synonyms = {
  amountOfSubstance: require('unit-synonyms-amount-of-substance').synonyms,
  area: require('unit-synonyms-area').synonyms,
  length: require('unit-synonyms-length').synonyms,
  mass: require('unit-synonyms-mass').synonyms,
  metricPrefixes: require('unit-synonyms-metric-prefixes').synonyms,
  temperature: require('unit-synonyms-temperature').synonyms,
  temperatureDifference: require('unit-synonyms-temperature-difference').synonyms,
  time: require('unit-synonyms-time').synonyms,
  volume: require('unit-synonyms-volume').synonyms
};

synonyms.distance = synonyms.length;

module.exports = (presets) => {
  var missingProperties = [
    'angle',
    'digitalInformation',
    'electricCurrent',
    'luminousIntensity',
    'velocity'
  ];

  missingProperties.forEach((missingProperty) => {
    synonyms[missingProperty] = identitySynonyms(presets[missingProperty].conversions);
  });

  return synonyms;
};
