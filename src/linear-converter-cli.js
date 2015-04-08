#!/usr/bin/env node

'use strict';

var program = require('commander');
var lc = require('linear-converter');

program
  .version('0.0.5-alpha.1')
  .usage('<number> [options]')
  .option('-n, --negative', 'treat <number> as negative')
  .option('-u, --unit [unit]', 'unit for the preset')
  .option('-p, --preset [preset]', 'name of the preset to use')
  .option('-i, --inverse', 'invert the preset')
  .option('-1, --preset-one [preset]', 'first preset to compose (transparently inverted)')
  .option('-2, --preset-two [preset]', 'second preset to compose')
  .parse(process.argv);

var preset;
var x = Number(program.args[0]);

if (program.negative) {
  x = -x;
}

if (program.preset) {
  preset = lc.PRESETS[program.unit][program.preset];
} else if (program.presetOne.length > 0 && program.presetTwo.length > 0) {
  preset = lc.composePresets([
    lc.invertPreset(lc.PRESETS[program.unit][program.presetOne]),
    lc.PRESETS[program.unit][program.presetTwo]
  ]);
}

if (program.inverse) {
  preset = lc.invertPreset(preset);
}

console.log(lc.convert(x, preset));

process.exit(0);
