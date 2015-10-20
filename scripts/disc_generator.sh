#!/bin/bash

BUNDLE=tmp/bundle.js
BUNDLE_MIN=tmp/bundle.min.js
DISC=tmp/disc.html
DISC_MIN=tmp/disc.min.html

browserify --no-builtins --full-paths src/linear-converter.js -o $BUNDLE
uglifyjs $BUNDLE > $BUNDLE_MIN

echo -e "\nO_o Generating discs"
discify $BUNDLE > $DISC
discify $BUNDLE_MIN > $DISC_MIN
