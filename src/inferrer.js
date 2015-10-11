'use strict';

module.exports = (synonyms) => {
  return (program) => {
    let property;

    Object.keys(synonyms).some((currentProperty) => {
      const found = synonyms[currentProperty].hasOwnProperty(program.from);

      if (found) {
        property = currentProperty;
      }

      return found;
    });

    return property;
  };
};
