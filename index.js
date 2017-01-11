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
        let response = "";
        let error = null;
        const config = {
            host: this.host,
            path: "/tclrega.exe",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": script.length
            },
        };

        let httpClient = http.request(config, (result) => {
            result.setEncoding("binary");
            let data = "";
            result.on("data", (chunk) => {
                data += chunk.toString();
            });
            result.on("end", () => {
                const pos = data.lastIndexOf("<xml><exec>");
                response = (data.substring(0, pos));
                if (callback) callback(error, response);
            });
        });

        httpClient.on("error", (error) => {
            console.log("Error " + error + "while executing rega script " + ls);
            if (callback) callback(error, response);
        });

        httpClient.on("timeout", () => {
            error = "timeout";
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