#homematic-js-api

[![npm version](https://badge.fury.io/js/homematic-js-api.svg)](https://badge.fury.io/js/homematic-js-api)

```
npm install homematic-js-api
```

#####Javascript interface
- Homematic XML-RPC
- Homematic Remote Script API (hm-Rega)

#####Basic Usage

hm-rega
```
const api = new (require('homematic-js-api'))('rega','20.1.0.50', "BidCos-RF.");

api.client.getValue("LEQ123456:1", "LEVEL", (error,response) => {
});
```
xml-rpc

```
const api = new (require('homematic-js-api'))('rpc','20.1.0.50', '2001');

api.client.setValue("LEQ123456:1", "LEVEL", "100");
```
find more examples in /test directory