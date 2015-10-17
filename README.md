# linear-converter-cli

CLI for [linear-converter](https://github.com/javiercejudo/linear-converter)

## Install

    npm i -g linear-converter-cli

## Usage

    $ linear-converter 25 --from metres --to yards
    27.34033245844269466325

    $ lco 25 -f m -t yd
    27.34033245844269466325

The program will try to infer the `--property` (`-p`) option if not present,
but it must be declared in cases with ambiguity.

    $ linear-converter 25 -f °C -t °F
    Ambiguous units: temperature, temperatureDifference.

    $ linear-converter 25 -p temperature -f °C -t °F
    77

    $ linear-converter 25 -p temperatureDifference -f °C -t °F
    45

Negative values can be declared using the `--negative` (`-n`) flag, or piped in.

    $ linear-converter -n 76 -p temperature --from fahrenheit --to celsius
    -60

    $ echo -76 | linear-converter -p temperature --from fahrenheit --to celsius
    -60

A final example to overcome the lack of some units (yards to hectometres):

    $ lco 34500 -f yards -t metres | lco -f none -t hecto
    315.468

## Help

    Usage: linear-converter <number> [options]

    Options:

      -h, --help                   output usage information
      -V, --version                output the version number
      -n, --negative               treat <number> as negative
      -p, --property [property]    property to convert
      -f, --from [unit]            unit to convert from (required)
      -t, --to [unit]              unit to convert to (required)
      -d, --precision [precision]  precision, amount of decimal places to work with
      -v, --verbose                show detailed output

    Examples

      $ linear-converter 25 --from metres --to yards
      $ lco -n 100 -f fahrenheit -t celsius
      $ lco 34500 -f yards -t metres | lco -f none -t hecto

    Properties and units

      amountOfSubstance

        mole, moles, mol
        poundMole, poundMoles, pound mole, pound moles, lb mol, lb-mol, lbmol

      angle

        radian, radians, rad, ㎭, r, c, ᶜ
        turn, turns, tr, pla, revolution, revolutions, rev, revs, complete rotation, complete rotations, rot, full circle, full circles, cycle, cycles
        degree, degrees, degree of arc, degrees of arc, arc degree, arc degrees, arcdegree, arcdegrees, °
        gradian, gradians, gon, gons, grad, grads, grade, grades, g, ᵍ

      area

        squareMetre, squareMetres, squareMeter, squareMeters, square metre, square metres, square meter, square meters, sq m, m2, m²
        squareKilometre, squareKilometres, squareKilometer, squareKilometers, square kilometre, square kilometer, square kilometers, sq km, km2, km²
        hectare, hectares, ha
        squareMile, squareMiles, square mile, square miles, sq mi, mi2, mi²
        acre, acres, ac
        squareYard, squareYards, square yard, square yards, sq yd, yd2, yd²
        squareFoot, squareFeet, square foot, square feet, sq ft, ft2, ft²
        squareInch, squareInches, square inch, square inches, sq in, in2, in²

      electricCurrent

        ampere, amperes, amp, A
        abampere, abamperes, abA, biot, biots, Bi

      length

        metre, metres, meter, meters, m
        kilometre, kilometres, kilometer, kilometers, km, klick, klicks
        centimetre, centimetres, centimeter, centimeters, cm
        millimetre, millimetres, millimeter, millimeters, mm
        mile, miles, mi
        yard, yards, yd
        foot, feet, ft, ′
        inch, inches, in, ″
        nauticalMile, nautical mile, nautical miles, M, NM, nmi

      mass

        kilogram, kilograms, kilogramme, kilogrammes, kilo, kilos, kg
        metricTon, metricTons, metric ton, metric tons, tonne, tonnes, megagram, megagrams, t
        gram, grams, gramme, grammes, g, gm
        milligram, milligrams, milligramme, milligrammes, mg
        microgram, micrograms, microgramme, microgrammes, µg, mcg
        longTon, longTons, long ton, long tons, imperial ton, imperial tons, weight ton, weight tons
        shortTon, shortTons, ton, tons
        stone, stones, stone weight, st
        pound, pounds, pound-mass, lb, lbs, lbm, ℔
        ounce, ounces, oz, ℥

      metricPrefixes

        yotta, Y, short septillion, long quadrillion
        zetta, Z, short sextillion, trilliard
        exa, E, short quintillion, long trillion
        peta, P, short quadrillion, billiard
        tera, T, short trillion, long billion
        giga, G, short billion, milliard
        mega, M, million
        kilo, k, thousand
        hecto, h, hundred
        deca, da, ten
        none
        deci, d, tenth
        centi, c, hundredth
        milli, m, thousandth
        micro, μ, millionth
        nano, n, short billionth, milliardth
        pico, p, short trillionth, long billionth
        femto, f, short quadrillionth, billiardth
        atto, a, short quintillionth, long trillionth
        zepto, z, short sextillionth, trilliardth
        yocto, y, short septillionth, long quadrillionth

      temperature

        celsius, centigrade, centigrades, °C, degree celsius, degrees celsius
        fahrenheit, fahrenheits, °F, degree fahrenheit, degrees fahrenheit
        kelvin, kelvins, K
        rankine, rankines, °R, degree rankine, degrees rankine
        romer, romers, degree romer, degree romers, rømer, rømers, degree rømer, degrees rømers, °Rø, °Ro
        newton, newtons, degree newton, degrees newton, °N
        delisle, delisles, degree delisle, degrees delisle, °D
        reaumur, reaumurs, degree reaumur, degrees reaumur, °Ré, °Re

      temperatureDifference

        celsius, centigrade, centigrades, °C, degree celsius, degrees celsius
        fahrenheit, fahrenheits, °F, degree fahrenheit, degrees fahrenheit
        kelvin, kelvins, K
        rankine, rankines, °R, degree rankine, degrees rankine
        romer, romers, degree romer, degree romers, rømer, rømers, degree rømer, degrees rømers, °Rø, °Ro
        newton, newtons, degree newton, degrees newton, °N
        delisle, delisles, degree delisle, degrees delisle, °D
        reaumur, reaumurs, degree reaumur, degrees reaumur, °Ré, °Re

      time

        nanosecond, nanoseconds, ns
        microsecond, microseconds, μs
        millisecond, milliseconds, ms
        second, seconds, s, sec
        minute, minutes, min
        hour, hours, hr, h
        day, days, civil day, civil days, d
        week, weeks, Wk.
        month, months, mean month, mean months
        year, years, mean year, mean years, a, y, yr
        decade, decades, mean decade, mean decades
        century, centuries, c., cent., Cent., mean century, mean centuries
        millennium, millenniums, mean millennium, mean millenniums

      volume

        cubicMetre, cubicMetres, cubicMeter, cubicMeters, cubic metre, cubic metres, cubic meter, cubic meters, m3, m³, kl, kL
        millilitre, millilitres, milliliter, milliliters, ml, mL, cubic centimetre, cubic centimetres, cubic centimeter, cubic centimeters, cm3, cm³
        litre, litres, liter, liters, ltr, l, ℓ, L, cubic decimetre, cubic decimetres, cubic decimeter, cubic decimeters, dm3, dm³
        cubicInch, cubicInches, cubic inch, cubic inches, cu in, in3, in³
        cubicFoot, cubicFeet, cubic foot, cubic feet, cu ft, ft3, ft³
        imperialFluidOunce, imperialFluidOunces, imperial fluid ounce, imperial fluid ounces, imperial fl oz
        imperialGill, imperialGills, imperial gill, imperial gills
        imperialPint, imperialPints, imperial pint, imperial pints, imperial pt, imperial p
        imperialQuart, imperialQuarts, imperial quart, imperial quarts
        imperialGallon, imperialGallons, imperial gallon, imperial gallons
        USDram, USDrams, US dram, US drams
        USFluidOunce, USFluidOunces, US fluid ounce, US fluid ounces, US fl oz
        USGill, USGills, US gill, US gills
        USCup, USCups, US cup, US cups
        USPint, USPints, US pint, US pints, US pt, US p
        USQuart, USQuarts, US quart, US quarts
        USGallon, USGallons, US gallon, US gallons

      digitalInformation

        byte
        bit
        kibibyte
        mebibyte
        gibibyte
        tebibyte
        pebibyte
        exbibyte
        zebibyte
        yobibyte

      luminousIntensity

        candela
        candlepower
        hefnerkerze

      velocity

        metresSecond
        milesHour
        feetSecond
        kilometresHour
        knot
