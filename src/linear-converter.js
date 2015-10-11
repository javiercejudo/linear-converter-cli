#!/usr/bin/env node

'use strict';

const isUndefined = require('lodash.isundefined');
const stdin = require('get-stdin');
const lcFactory = require('linear-converter');
const anyToAnyFactory = require('linear-preset-any-to-any');
const arbitraryPrecision = require('arbitrary-precision');

const presets = require('linear-presets').PRESETS;
const synonyms = require('./synonyms')(presets);
const inferrer = require('./inferrer')(synonyms);

let program = require('./program')(synonyms);

// might want to use different adapters depending on program options
const adapter = require('bigjs-adapter');
const Decimal = arbitraryPrecision(adapter);

if (program.precision) {
  Decimal.setPrecision(Number(program.precision));
}

const lc = lcFactory(Decimal);
const anyToAny = anyToAnyFactory(Decimal);
const property = inferrer(program);

if (isUndefined(presets[property])) {
  console.error(`Unrecognised unit: ${program.from}`);
  process.exit(1);
}

const conversions = presets[property].conversions;
const to = synonyms[property][program.to];

if (isUndefined(to)) {
  console.error(`Unrecognised ${property} unit: ${program.to}`);
  process.exit(2);
}

const conversion = anyToAny(
  conversions,
  synonyms[property][program.from],
  synonyms[property][program.to]
);

const inputParser = require('./inputParser');

stdin().then((input) => {
  const x = inputParser(input, program, Decimal);

  console.log(lc.convert(conversion, x).toString());
  process.exit(0);
}).catch((reason) => {
  console.error(reason);
  process.exit(3);
});
