const homematicRega = require("./homematicRega");
const homematicRPC = require("./homematicRpc");

class api {
    constructor(mode, ip, port) {
        if(mode == "rpc") {
            this.client = new homematicRPC(ip, port);
        } else {
            this.client = new homematicRega(ip, port);
        }
    }
}

module.exports = api;