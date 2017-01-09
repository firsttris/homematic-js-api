"use strict";
const http = require("http");
const Homematic = require('./homematic');

class HomematicRega extends Homematic {

    constructor (host, interfaceName) {
        super(host);
        this.interface = interfaceName;
    }

    sendScript (script, callback) {
        const ls = script;
        let response;
        let error;
        const config = {
            host: this.host,
            port: "8181",
            path: "/tclrega.exe",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": script.length
            },
        };

        let httpClient = http.request(config, (res) => {
            res.setEncoding("binary");
            let data = "";
            res.on("data", function (chunk) {
                data += chunk.toString();
            });
            res.on("end", function () {
                const pos = data.lastIndexOf("<xml><exec>");
                response = (data.substring(0, pos));
                if (callback) callback(error, response);
            });
        });

        httpClient.on("error", function (e) {
            error = e;
            console.log("Error " + e + "while executing rega script " + ls);
            if (callback) callback(error, response);
        });

        httpClient.on("timeout", function () {
            error = "timeout";
            console.log("timeout while executing rega script");
            if (callback) callback(error, response);
        });

        httpClient.setTimeout(1500);
        httpClient.write(script);
        httpClient.end();
    }

    getValue (channel, attribute, callback) {
        const script = "var d = dom.GetObject(\"" + this.interface + channel + "." + attribute + "\");if (d){Write(d.State());}";
        this.sendScript(script, callback);
    }

    setValue (channel, attribute, value, callback) {
        const script = "var d = dom.GetObject(\"" + this.interface + channel + "." + attribute + "\");if (d){d.State(\"" + value + "\");}";
        this.sendScript(script, callback);
    }

    setVariable (channel, callback) {
        const script = "var d = dom.GetObject(\"" + this.interface + channel + "\");if (d){d.State(\"" + value + "\");}";
        this.sendScript(script, callback);
    }

    getVariable (channel, callback) {
        const script = "var d = dom.GetObject(\"" + this.interface + channel + "\");if (d){Write(d.State());}";
        this.sendScript(script, callback);
    }

}

module.exports = HomematicRega;