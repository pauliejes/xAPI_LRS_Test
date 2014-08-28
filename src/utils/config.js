"use strict";
var singleton;

module.exports = function (cfgFile) {
    if (cfgFile) {
        singleton = require(cfgFile);
    }
    else if (! singleton) {
        throw new Error ("Configuration request but file not loaded");
    }

    if (! singleton.lrs) {
        throw new Error("Invalid configuration: missing 'lrs'");
    }
    if (! singleton.lrs.endpoint) {
        throw new Error("Invalid configuration: missing 'lrs.endpoint'");
    }

    if (! singleton.lrs.authString) {
        singleton.lrs.authString = "Basic " + new Buffer(singleton.lrs.username + ":" + singleton.lrs.password).toString("base64");
    }

    return singleton;
};
