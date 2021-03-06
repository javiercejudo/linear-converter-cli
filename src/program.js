'use strict';

const pkg = require('../package.json');
const program = require('commander');
const invert = require('lodash.invert');

program
  .version(pkg.version)
  .usage('<number> [options]')
  .option('-n, --negative', 'treat <number> as negative')
  .option('-p, --property [property]', 'property to convert')
  .option('-f, --from [unit]', 'unit to convert from (required)')
  .option('-t, --to [unit]', 'unit to convert to (required)')
  .option('-d, --precision [precision]', 'precision, amount of decimal places to work with')
  .option('-v, --verbose', 'show detailed output');

const preface = (
`  Examples

    $ linear-converter 25 --from metres --to yards
    $ lco -n 100 -p temperature -f fahrenheit -t celsius
    $ lco 34500 -f yards -t metres | lco -f none -t hecto

  Properties and units`);

const help = (synonyms) => {
  return () => {
    console.log(preface);

    Object.keys(synonyms).forEach((property) => {
      console.log('\n    ' + property + '\n');
      const currentSynonyms = invert(synonyms[property], true);

      Object.keys(currentSynonyms).forEach((unit) => {
        console.log(`      ${currentSynonyms[synonyms[property][unit]].join(', ')}`);
      });
    });
  };
};

module.exports = (synonyms) => {
  program.on('--help', help(synonyms));
  program.parse(process.argv);

  return program;
};
