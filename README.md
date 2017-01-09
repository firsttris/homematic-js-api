#homematic-js-api
small Javascript interface for Homematic XML-RPC and Remote Script API (Rega)

[![npm version](https://badge.fury.io/js/homematic-js-api.svg)](https://badge.fury.io/js/homematic-js-api)
[![Dependency Status](https://david-dm.org/firsttris/homematic-js-api.svg)](https://david-dm.org/firsttris/homematic-js-api) 
```
npm install homematic-js-api
```

###Interfaces
- Homematic XML-RPC
- Homematic Remote Script API (hm-Rega)

###Basic Usage

hm-rega
```
const api = new (require('homematic-js-api'))('rega','20.1.0.50', "BidCos-RF.");
api.call.getValue("LEQ123456:1", "LEVEL", (error,response) => {
});
```
xml-rpc

```
const api = new (require('homematic-js-api'))('rpc','20.1.0.50', '2001');
api.call.setValue("LEQ123456:1", "LEVEL", "100");
```
find more examples in /test directory