"use strict";
/**
 * Created by Tristan on 08.01.2017.
 */


const api = new (require('./index'))('rega','20.1.0.50', "BidCos-RF.");

const devices = {
    bedroomDimLight: "LEQ0990753:1",
    keymatic: "KEQ1063873:1"
};

//home.setValue(devices.keymatic, "OPEN", "1");
api.client.setValue(devices.bedroomDimLight, "LEVEL", "0");
