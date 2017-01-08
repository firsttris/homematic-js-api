/**
 * Created by Tristan on 08.01.2017.
 */
const api = new (require('./index'))('rpc','20.1.0.50', '2001');

const devices = {
    bedroomDimLight: "LEQ0990753:1",
    keymatic: "KEQ1063873:1"
};

//home.setValue(devices.bedroomDimLight, "LEVEL", "100");
api.client.setLevel(devices.bedroomDimLight, false);