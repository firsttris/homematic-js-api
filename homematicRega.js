/**
 * Created by Tristan on 08.01.2017.
 */
const http = require("http");

class homeMaticRega {

    constructor (ccuip, interfaceName) {
        this.ccuIP = ccuip;
        this.interface = interfaceName;
        this.timeout = 60;
    }

    script (script, callback) {
        const ls = script;

        const config = {
            host: this.ccuIP,
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
                const response = (data.substring(0, pos));
                console.log("Rega Response: "+response);
                callback(response);
            });
        });


        httpClient.on("error", function (e) {
            console.log("Error " + e + "while executing rega script " + ls);
            callback(undefined);
        });

        httpClient.on("timeout", function (e) {
            console.log("timeout while executing rega script");
            callback(undefined);
        });

        httpClient.setTimeout(60 * 1000);
        console.log("Write Script: "+script);
        httpClient.write(script);
        httpClient.end();
    }

    getValue (channel, datapoint, callback) {
        const script = "var d = dom.GetObject(\""+ this.interface + channel + "." + datapoint + "\");if (d){Write(d.State());}";
        this.script(script, function (data) {
            if (data !== undefined) {
                callback(data);
            }
        });
    }

    setValue (channel, datapoint, value) {
        const script = "var d = dom.GetObject(\""+ this.interface + channel + "." + datapoint + "\");if (d){d.State(\"" + value + "\");}";
        this.script(script, function (data) {
        });
    }

    setVariable (channel, value) {
        const script = "var d = dom.GetObject(\""+ this.interface + channel + "\");if (d){d.State(\"" + value + "\");}";
        this.script(script, function (data) {
        });
    }


    getVariable (channel, callback) {
        const script = "var d = dom.GetObject(\""+ this.interface + channel + "\");if (d){Write(d.State());}";
        this.script(script, function (data) {
            if (data !== undefined) {
                callback(data);
            }
        });
    }

}

module.exports = homeMaticRega;