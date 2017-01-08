"use strict";
const HomematicRega = require("./lib/homematicRega");
const HomematicRPC = require("./lib/homematicRpc");

class api {
    constructor(mode, ip, port) {
        if(mode == "rpc") {
            this.call = new HomematicRPC(ip, port);
        } else {
            this.call = new HomematicRega(ip, port);
        }
    }
}

module.exports = api;