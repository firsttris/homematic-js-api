const assert = require('assert');
const Api = require('./../index');

describe('Test Dimmer', function () {

    before(function () {
        this.api = new Api('rpc','20.1.0.50', '2001');
        this.devices = {
            bedroomDimLight: "LEQ0990753:1",
            keymatic: "KEQ1063873:1"
        };
    });

    it('setValue should set light level to 30%', function (done) {
        this.api.call.setValue(this.devices.bedroomDimLight, "LEVEL", "0.3", (error, response) => {
            assert.equal(error, null, "error should be null");
            assert.equal(response, "", "should be empty");
            done();
        });
    });

    it('getValue should return 0', function (done) {
        this.api.call.getValue(this.devices.bedroomDimLight, "LEVEL", (error, response) => {
            assert.equal(error, null, "error should be null");
            assert.equal(response, "0", "should return true if on");
            done();
        });
    });

    it('getLevel should return 0', function (done) {
        this.api.call.getLevel(this.devices.bedroomDimLight, (error, response) => {
            assert.equal(error, null, "error should be null");
            assert.equal(response, "0", "should return true if on");
            done();
        });
    });

    it('getLevelPower should return true if on', function (done) {
        this.api.call.isLevelOn(this.devices.bedroomDimLight, (error, response) => {
            assert.equal(error, null, "error should be null");
            assert.equal(response, false, "should return true if on");
            done();
        });
    });

    it('should set light level to 0%', function (done) {
        this.api.call.setValue(this.devices.bedroomDimLight, "LEVEL", "0", (error, response) => {
            assert.equal(error, null, "error should be null");
            assert.equal(response, "", "should be empty");
            done();
        });
    });

    it('should turn on', function (done) {
        this.api.call.setLevel(this.devices.bedroomDimLight, true, (error, response) => {
            assert.equal(error, null, "error should be null");
            assert.equal(response, "", "should be empty");
            done();
        });
    });

    it('should turn off', function (done) {
        this.api.call.setLevel(this.devices.bedroomDimLight, false, (error, response) => {
            assert.equal(error, null, "error should be null");
            assert.equal(response, "", "should be empty");
            done();
        });
    });

});