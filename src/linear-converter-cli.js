#!/usr/bin/env node

'use strict';

var program = require('commander');
var lc = require('linear-converter');

program
  .version('0.0.1')
  .usage('<number> [options]')
  .option('-n, --negative', 'Treat <number> as negative')
  .option('-u, --unit [unit]', 'Unit for the preset')
  .option('-p, --preset [preset]', 'Name of the preset to use')
  .parse(process.argv);

var x = Number(program.args[0]);

if (program.negative) {
  x = -x;
}

console.log(lc.convert(x, lc.PRESETS[program.unit][program.preset]));
