"use strict";

var assert = require("assert"),
    assertions = require("../utils/assertions"),
    makeRequest = require("../utils/request").makeRequest,
    English = require("yadda").localisation.English,
    library;

library = English.library();
library.then(
    "(?:[Tt]he) (?:retrieveState|retrieveActivityProfile|retrieveAgentProfile) response is verified",
    function (next) {
        var main = this.scenarioResource.main,
            primer = this.scenarioResource.primers[0];

        assertions.statusCodes(main.response.statusCode, 200);

        if (main.request.headers["Content-Type"]) {
            assert.equal(main.response.headers["content-type"], primer.request.headers["Content-Type"]);
        }
        if (main.request.content) {
            if ( main.response.headers["content-type"] &&
                main.response.headers["content-type"].indexOf("application/json") === 0 &&
                typeof primer.request.content === "object") {
                assert.equal(main.response.body, JSON.stringify(primer.request.content));
            }
            else {
                assert.equal(main.response.body, primer.request.content);
            }
        }
        next();
    }
);

library.then(
    "(?:[Tt]he) (?:deleteState|deleteActivityProfile|deleteAgentProfile) response is verified",
    function (next) {
        assertions.statusCodes(this.scenarioResource.main.response.statusCode, 204);

        this.scenarioResource.verify.endpoint = this.scenarioResource.endpoint;

        makeRequest(
            this.scenarioResource.verify,
            function (err, res) {
                if (err) {
                    next(new Error("Request failed: " + err));
                    return;
                }
                if (res.statusCode.toString() !== "404") {
                    next(new Error("The verify request did not return the expected status (404), instead returned: " + res.status));
                    return;
                }
                next();
            },
            this
        );
    }
);

library.then(
    "(?:[Tt]he) clearState response is verified",
    function (next) {
        assertions.statusCodes(this.scenarioResource.main.response.statusCode, 204);
        this.scenarioResource.verify.endpoint = this.scenarioResource.endpoint;

        makeRequest(
            this.scenarioResource.verify,
            function (err, res) {
                if (err) {
                    next(new Error("Request failed: " + err));
                    return;
                }
                if (res.statusCode.toString() !== "200") {
                    next(new Error("The verify request did not return the expected status (200), instead returned: " + res.status));
                    return;
                }
                else if (res.body !== "[]") {
                    next(new Error("The verify request did not return the expected empty array body, instead returned: " + res.body));
                    return;
                }
                next();
            },
            this
        );
    }
);

library.then(
    "(?:[Tt]he) (retrieveStateIds|retrieveActivityProfileIds|retrieveAgentProfileIds) response is verified",
    function (reqType, next) {
        var body = JSON.parse(this.scenarioResource.main.response.body, "utf8"),
            idType = (reqType === "retrieveStateIds") ? "stateId" : "profileId";

        assert.equal(this.scenarioResource.primers.length, body.length);

        this.scenarioResource.primers.forEach(
            function (primer) {
                assert.ok(body.indexOf(primer.request.params[idType]) !== -1);
            }
        );
        next();
    }
);

library.then([
    "(?:[Tt]he) (?:stateMerging|agentProfileMerging|activityProfileMerging) response is verified",
    "(?:[Tt]he) (?:stateConcurrency|agentProfileConcurrency|activityProfileConcurrency) response is verified"
    ],
    function (next) {
        this.scenarioResource.verify.endpoint = this.scenarioResource.endpoint;

        makeRequest(
            this.scenarioResource.verify,
            function (err, res) {
                if (res.statusCode.toString() !== "200") {
                    next(new Error("The verify request did not return the expected status (200), instead returned: " + res.statusCode));
                }
                else {
                    this.scenarioResource.validate(res);
                    next();
                }
            }.bind(this),
            this
        );
    }
);

module.exports = library;
