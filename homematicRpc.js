"use strict";
const xmlrpc = require('xmlrpc');

class homematicRpc {

    constructor (host, port) {
        this.lastMessage = "";
        this.DECREASING = 0;
        this.INCREASING = 1;
        this.STOPPED = 2;
        this.host = host;
        this.port = port;
        this.listeningPort = 9111;
        this.localIP = "0.0.0.0";
        this.client = xmlrpc.createClient({
            host: host,
            port: port
        });
    }

    registerEventServerInCCU (nameToRegister) {
        console.log("Init Call on host %s and port %s", this.host, this.port);
        this.client.methodCall("init", ["http://" + this.host + ":" + this.listeningPort, "homematicRpc_" + nameToRegister], function (error, value) {
            console.log("CCU Response ...Value (%s) Error : (%s)", JSON.stringify(value), error);
            this.lastMessage = Math.floor((new Date()).getTime() / 1000);
        });
    }

    removeEventServerFromCCU () {
        console.log("Removing Event Server");
        this.client.methodCall("init", ["http://" + this.host + ":" + this.listeningPort], function (error, value) {
        });
    }

    createEventServer () {
        this.localIP = this.getIPAddress();
        if (this.localIP == "0.0.0.0") {
            that.log("Can not fetch IP");
            return;
        }

        const server = xmlrpc.createServer({ host: this.localIP, port: this.listeningPort });

        server.on("NotFound", function(method, params) {
            console.log("Method %s does not exist. - %s",method, JSON.stringify(params));
        });

        server.on("system.listMethods", function(err, params, callback) {
            console.log("Method call params for 'system.listMethods': %s" ,  JSON.stringify(params));
            callback(null, ["event","system.listMethods", "system.multicall"]);
        });

        server.on("listDevices", function(err, params, callback) {
            console.log('rpc <- listDevices on %s - Zero Reply',that.interface);
            callback(null,[]);
        });


        server.on("newDevices", function(err, params, callback) {
            console.log('rpc <- newDevices on %s nobody is interested in newdevices ... ',that.interface);
            // we are not intrested in new devices cause we will fetch them at launch
            callback(null,[]);
        });


        server.on("event", function(err, params, callback) {
            console.log('rpc <- event  on %s'  , this.interface );
            this.lastMessage = Math.floor((new Date()).getTime() / 1000);
            const channel = that.interface + params[1];
            const datapoint = params[2];
            const value = params[3];
            console.log("Ok here is the Event" + JSON.stringify(params));
            console.log("RPC single event for %s %s with value %s",channel,datapoint,value);

            callback(null,[]);
        });

        server.on("system.multicall", function(err, params, callback) {
            console.log('rpc <- system.multicall on %s'  , that.interface);
            this.lastMessage = Math.floor((new Date()).getTime() / 1000);
            params.map(function(events) {
                try {
                    events.map(function(event) {
                        if ((event["methodName"] == "event") && (event["params"] !== undefined)) {
                            const params = event["params"];
                            const channel = that.interface + params[1];
                            const datapoint = params[2];
                            const value = params[3];
                            console.log("RPC event for %s %s with value %s",channel,datapoint,value);
                        }
                    });
                } catch (err) {}
            });
            callback(null);
        });
        console.log("XML-RPC server is listening on port %s.", this.listeningPort);
    }

    getIPAddress () {
        const interfaces = require("os").networkInterfaces();
        for (let devName in interfaces) {
            const iface = interfaces[devName];
            for (let i = 0; i < iface.length; i++) {
                const alias = iface[i];
                if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal)
                    return alias.address;
            }
        }
        return "0.0.0.0";
    }

    getValue (device, attribute, callback) {
        this.client.methodCall('getValue', [device, attribute], function (error, response) {
            if(callback) callback(error, response);
        });
    }

    setValue (device, attribute, value, callback) {
        this.client.methodCall('setValue', [device, attribute, value], function (error, response) {
            if(callback) callback(error, response);
        });
    }

    getState (device, callback) {
        this.getValue(device, "STATE", function (error, response) {
            const isPowerOn = response == "true";
            if(callback) callback(isPowerOn);
        });
    }

    setState (device, value, callback) {
        const powerOn = value ? "true" : "false";
        this.setValue(device, "STATE", value, callback);
    }

    getLevelPower (device, callback) {
        this.getValue(device, "LEVEL", function (error, response) {
            const isPowerOn = parseFloat(response) > 0;
            if(callback) callback(isPowerOn);
        });
    }

    getLevel (device, callback) {
        this.getValue(device, "LEVEL", function (error, response) {
            let value = parseFloat(response) * 100;
            if(callback) callback(value);
        });
    }

    setLevel (device, value, callback) {
        let levelString;
        if (typeof value == "boolean") {
            levelString = value ? "1" : "0";
        } else if (typeof value == "string" || typeof value == "number") {
            levelString = (parseFloat(value) / 100).toString();
        }
        this.setValue(device, "LEVEL", levelString, callback);
    }

    getTargetTemperature (device, callback) {
        this.getValue(device, "SET_TEMPERATURE", callback);
    }

    setTargetTemperature (device, value, callback) {
        this.setValue(device, "SET_TEMPERATURE", value.toString(), callback);
    }

    getCurrentTemperature (device, callback) {
        this.getValue(device, "ACTUAL_TEMPERATURE", callback);
    }

    getWindowCoveringPositionState (device, callback) {
        this.getValue(device, "DIRECTION", function (error, response) {
            let positionState = this.STOPPED;
            switch (response) {
                case 1:
                    positionState = this.INCREASING;
                    break;
                case 2:
                    positionState = this.DECREASING;
                    break;
            }
            if(callback) callback(positionState);
        });
    }

}

module.exports = homematicRpc;