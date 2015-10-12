#!/usr/bin/env node

'use strict';

const isUndefined = require('lodash.isundefined');
const stdin = require('get-stdin');
const lcFactory = require('linear-converter');
const anyToAnyFactory = require('linear-preset-any-to-any');
const arbitraryPrecision = require('arbitrary-precision');

const presets = require('linear-presets').PRESETS;

let emitter = require('./eventEmitter');

const synonyms = require('./synonyms')(presets);
const inferrer = require('./inferrer')(synonyms);

let program = require('./program')(synonyms);

if (program.verbose) {
  emitter.on('log', (message) => {
    console.log(message);
  });
}

// might want to use different adapters depending on program options
const adapter = require('bigjs-adapter');
const Decimal = arbitraryPrecision(adapter);

if (program.precision) {
  Decimal.setPrecision(Number(program.precision));
}

const lc = lcFactory(Decimal);
const anyToAny = anyToAnyFactory(Decimal);
const properties = inferrer(program);

if (properties.size === 0) {
  console.error('Unable to infer property.');
  process.exit(1);
}

if (properties.size > 1) {
  console.error(`Ambiguous units: ${Array.from(properties).join(', ')}.`);
  console.error(`Please specify a property using the --property (-p) option.`);
  process.exit(1);
}

const property = properties.values().next().value;

if (isUndefined(synonyms[property])) {
  console.error(`Unrecognised property: ${property}`);
  process.exit(1);
}

const from = synonyms[property][program.from];

if (isUndefined(from)) {
  console.error(`Unrecognised ${property} unit: ${program.from}`);
  process.exit(1);
}

const to = synonyms[property][program.to];

if (isUndefined(to)) {
  console.error(`Unrecognised ${property} unit: ${program.to}`);
  process.exit(1);
}

const conversion = anyToAny(presets[property].conversions, from, to);
const inputParser = require('./inputParser');

stdin().then((input) => {
  const x = inputParser(input, program, Decimal);

  emitter.emit('log', `Converting ${property}: ${x} ${from} to ${to}`);

  console.log(lc.convert(conversion, x).toString());
  process.exit(0);
}).catch((reason) => {
  console.error(reason);
  process.exit(1);
});
