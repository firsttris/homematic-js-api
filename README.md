# homematic-js-api
:house: lightweight Javascript interface for Homematic Remote Script API (Rega)

[![npm version](https://badge.fury.io/js/homematic-js-api.svg)](https://badge.fury.io/js/homematic-js-api)

```
npm install homematic-js-api
```

## Basic Usage
```
const homematic = new (require('homematic-js-api'))('20.1.0.50', "BidCos-RF.");
homematic.setValue("LEQ123456:1", "LEVEL", "0.3", (error, response) => {
});
homematic.getValue("LEQ123456:1", "LEVEL", (error,response) => {
});
```

## Tests
Find more examples in "test" directory.

Enter you homematic server connection in package.json, and run some tests!
```
  "homematic": {
    "host": "192.168.0.10",
    "devices": {
      "bedroomDimLight": "LEQ123456:1",
      "keymatic": "KEQ123456:1"
    }
  }
```

run a single test from commandline with:
```
mocha test/dimmer.spec.js -g "getValue should return 0.000000"
```

## License

[MIT](http://opensource.org/licenses/MIT)
