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
const api = new (require('./index'))('rega','20.1.0.50', "BidCos-RF.");

api.client.setValue("LEQ123456:1", "LEVEL", "0");
```
xml-rpc

```
const api = new (require('./index'))('rpc','20.1.0.50', '2001');

api.client.setValue("LEQ123456:1", "LEVEL", "100");
```