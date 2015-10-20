#!/bin/bash

set -e

FAHRENHEIT_TO_CELSIUS="node src/linear-converter.js -n 100 -p temperature -f fahrenheit -t celsius"
echo -e "\n$FAHRENHEIT_TO_CELSIUS"
eval $FAHRENHEIT_TO_CELSIUS

METRE_TO_YARDS="node src/linear-converter.js 25 --from metres --to yards -d 50"
echo -e "\n$METRE_TO_YARDS"
eval $METRE_TO_YARDS

PIPING="node src/linear-converter.js 34500 -f yards -t metres | node src/linear-converter.js -f none -t hecto"
echo -e "\n$PIPING"
eval $PIPING
