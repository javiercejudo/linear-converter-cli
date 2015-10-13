'use strict';

const negate = require('lodash.negate');

const aliases = new Set(['distance']);
const isAlias = (name) => aliases.has(name);
const isNotAlias = negate(isAlias);

module.exports = {
  aliases,
  isAlias,
  isNotAlias
};
