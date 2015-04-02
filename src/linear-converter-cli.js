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
  .parse(process.argv);

var x = Number(program.args[0]);

if (program.negative) {
  x = -x;
}

console.log(lc.convert(x, lc.PRESETS[program.unit][program.preset]));

process.exit(0);
