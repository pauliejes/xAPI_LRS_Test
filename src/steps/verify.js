"use strict";

var assert = require("assert"),
    makeRequest = require("../utils/request").makeRequest,
    English = require("yadda").localisation.English,
    library;

library = English.library();
library.then(
    "(?:[Tt]he) retrieveState response is verified",
    function (next) {
        var main = this.scenarioResource.main,
            primer = this.scenarioResource.primers[0];

        assert.equal(main.response.statusCode.toString(), "200");

        if(main.request.headers["Content-Type"]) {
            assert.equal(main.response.headers["content-type"], primer.request.headers["Content-Type"]);
        }
        if(main.request.content) {
            if( main.response.headers["content-type"] &&
                main.response.headers["content-type"].indexOf("application/json") === 0 &&
                typeof primer.request.content === "object") {
                assert.equal(main.response.body, JSON.stringify(primer.request.content));
            } else {
                assert.equal(main.response.body, primer.request.content);
            }
        }
        next();
    }
);

library.then(
    "(?:[Tt]he) deleteState response is verified",
    function(next) {
        assert.equal(this.scenarioResource.main.response.statusCode.toString(), "204");

        makeRequest(
            this.scenarioResource.verify,
            function (err, res) {
                if (res.statusCode.toString() !== "404") {
                    next(new Error("The verify request did not return the expected status (404), instead returned: " + res.status));
                } else {
                    next();
                }
            }
        );
    }
);

library.then(
    "(?:[Tt]he) clearState response is verified",
    function(next) {
        assert.equal(this.scenarioResource.main.response.statusCode.toString(), "204");
        makeRequest(
            this.scenarioResource.verify,
            function (err, res) {
                if (res.statusCode.toString() !== "200") {
                    next(new Error("The verify request did not return the expected status (200), instead returned: " + res.status));
                } else if (res.body !== "[]") {
                    next(new Error("The verify request did not return the expected empty array body, instead returned: " + res.body));
                } else {
                    next();
                }
            }
        );
    }
);

library.then(
    "(?:[Tt]he) retrieveStateIds response is verified",
    function(next) {
        var body = JSON.parse(this.scenarioResource.main.response.body, "utf8");
        assert.equal(this.scenarioResource.primers.length, body.length);
        this.scenarioResource.primers.forEach( function(primer) {
            assert.ok(body.indexOf(primer.request.params.stateId) !== -1);
        });
        next();
    }
);

module.exports = library;