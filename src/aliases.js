'use strict';

const negate = require('lodash.negate');

const aliases = new Set([
  'distance'
]);

const isAlias = (name) => {
  return aliases.has(name);
};

module.exports = {
  aliases: aliases,
  isAlias: isAlias,
  isNotAlias: negate(isAlias)
};
