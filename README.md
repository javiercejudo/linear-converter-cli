# linear-converter-cli

CLI for [linear-converter](https://github.com/javiercejudo/linear-converter)

## Install

    npm i linear-converter-cli -g

## Basic usage

    linear-converter 25 -u temperature -p celsiusToFahrenheit

## Help

    Usage: linear-converter-cli <number> [options]

    Options:

      -h, --help                 output usage information
      -V, --version              output the version number
      -n, --negative             treat <number> as negative
      -u, --unit [unit]          unit for the preset
      -p, --preset [preset]      name of the preset to use
      -i, --inverse              invert the preset
      -1, --preset-one [preset]  first preset to compose (transparently inverted)
      -2, --preset-two [preset]  second preset to compose
