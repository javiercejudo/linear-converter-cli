/*jshint node:true, mocha:true */

'use strict';

require('should');

var aliases = require('../src/aliases');
var inferrer = require('../src/inferrer');
var inputParser = require('../src/inputParser');
var synonyms = require('../src/synonyms');

describe('aliases', function() {
  it('should have a set of aliases', () => {
    aliases.aliases.toString().should.be.exactly('[object Set]');
  });

  it('should have a function to check for aliases', () => {
    aliases.isAlias('distance').should.be.exactly(true);
    aliases.isAlias('length').should.be.exactly(false);
  });

  it('should have a function to check for non-aliases', () => {
    aliases.isNotAlias('length').should.be.exactly(true);
    aliases.isNotAlias('distance').should.be.exactly(false);
  });
});
