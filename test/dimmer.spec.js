const assert = require('assert');
const Homematic = require('./../index');
const path = require('path');
const fs = require('fs');
const packageJsonPath = path.join(__dirname, './../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

describe('Test Dimmer Rega', function () {

    describe('Timeout Test', function () {
        before(function () {
            this.homematic = new Homematic('191.167.0.50', "BidCos-RF.");
        });

        it('getValue should return timeout', function (done) {
            this.homematic.getValue(this.devices.bedroomDimLight, "LEVEL", (error, response) => {
                assert.equal(error, "timeout", "should respond with timeout");
                done();
            });
        });
    });

    before(function () {
        this.homematic = new Homematic(packageJson.homematic.host, "BidCos-RF.");
        this.devices = packageJson.homematic.devices;
    });

    it('setValue should set light level to 30%', function (done) {
        this.homematic.setValue(this.devices.bedroomDimLight, "LEVEL", "0.3", (error, response) => {
            assert.equal(error, null, "error should be null");
            assert.equal(response, "", "should be empty");
            done();
        });
    });

    it('getValue should return 0.000000', function (done) {
        this.homematic.getValue(this.devices.bedroomDimLight, "LEVEL", (error, response) => {
            assert.equal(error, null, "error should be null");
            assert.equal(response, "0.000000", "should 0.000000 if off");
            done();
        });
    });

    it('getLevel should return 0', function (done) {
        this.homematic.getLevel(this.devices.bedroomDimLight, (error, response) => {
            assert.equal(error, null, "error should be null");
            assert.equal(response, "0", "should return 0 is off");
            done();
        });
    });

    it('isLevelOn should return false if off', function (done) {
        this.homematic.isLevelOn(this.devices.bedroomDimLight, (error, response) => {
            assert.equal(error, null, "error should be null");
            assert.equal(response, false, "should return false if off");
            done();
        });
    });

    it('should set light level to 0%', function (done) {
        this.homematic.setValue(this.devices.bedroomDimLight, "LEVEL", "0", (error, response) => {
            assert.equal(error, null, "error should be null");
            assert.equal(response, "", "should be empty");
            done();
        });
    });

    it('should turn on', function (done) {
        this.homematic.setLevel(this.devices.bedroomDimLight, true, (error, response) => {
            assert.equal(error, null, "error should be null");
            assert.equal(response, "", "should be empty");
            done();
        });
    });

    it('should turn off', function (done) {
        this.homematic.setLevel(this.devices.bedroomDimLight, false, (error, response) => {
            assert.equal(error, null, "error should be null");
            assert.equal(response, "", "should be empty");
            done();
        });
    });

});