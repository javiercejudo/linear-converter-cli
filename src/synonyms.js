'use strict';

const identitySynonyms = (conversions) => {
  var unitSynonyms = {};

  Object.keys(conversions).map((unit) => {
    unitSynonyms[unit] = unit;
  });

  return unitSynonyms;
};

var synonyms = {
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
    'amountOfSubstance',
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
