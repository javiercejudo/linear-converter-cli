'use strict';

module.exports = (x, program, Decimal) => {
  if (x === '') {
    x = program.args[0];
  }

  x = new Decimal(x.toString().trim());

  if (program.negative) {
    x = x.times(new Decimal('-1'));
  }

  return x;
};
