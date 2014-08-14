"use strict";

var assert = require("assert"),
    response = require("./response");

module.exports = {
    statusCodes: function (actual, expected) {
        expected = Array.isArray(expected) ? expected : [ expected ];
        assert.ok(expected.indexOf(actual) > -1,
            "Response status: " + actual + ", expected: [" + expected + "]");
    },
    responseStructure: function (actual, type) {
        // Could not output actual in the message, as JSON.stringifying it blocked
        assert.ok(response(actual, type), "The response structure was not valid");
    }
};

