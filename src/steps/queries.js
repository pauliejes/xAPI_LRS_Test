"use strict";

var English = require("yadda").localisation.English,
    assert = require("assert"),
    assertions = require("../utils/assertions"),
    factory = require("../utils/factory"),
    formats = require("../utils/formats"),
    library = English.library();

library.given(
    "a time bounded query",
    function (next) {
        this.scenarioResource.main = {
            request: factory.make("query fetchStatements")
        };
        this.scenarioResource.main.request.params.since = this.featureResource.queryMeta.begin;
        this.scenarioResource.main.request.params.until = this.featureResource.queryMeta.end;

        next();
    }
);

library.given(
    "the registration parameter is loaded",
    function (next) {
        this.scenarioResource.main.request.params.registration = this.featureResource.queryMeta.registration;
        next();
    }
);

library.then(
    "the $testName query is verified",
    function (testName, next) {
        var group = this.featureResource.queryMeta.groups[testName],
            response = this.scenarioResource.main.response,
            body,
            ids = [];

        if (! group) {
            next(new Error("Unrecognized query test group: " + testName));
            return;
        }

        //
        // TODO: move these checks into an improved utils/response
        //       and potentially move it into utils/assertions
        //
        assertions.statusCodes(response.statusCode, 200);
        assert.ok(response.headers["content-type"].lastIndexOf("application/json", 0) === 0);
        assert.ok(new RegExp(formats.iso_date).test(response.headers["x-experience-api-consistent-through"]), "Consistent through header ISO date");

        try {
            body = JSON.parse(response.body);
        }
        catch (ex) {
            throw new Error("Unable to JSON parse query response body: " + ex);
        }

        Object.keys(body).forEach(
            function (k) {
                if (k !== "more" && k !== "statements") {
                    throw new Error("Invalid StatementResult response: unrecognized object property '" + k + "'");
                }
            }
        );

        if (typeof body.statements === "undefined") {
            throw new Error("Invalid StatementResult response: missing 'statements' property");
        }
        if (! Array.isArray(body.statements)) {
            throw new Error("Invalid StatementResult response: 'statements' value is not an array");
        }

        if (body.statements.length > 0) {
            body.statements.forEach(
                function (st) {
                    ids.push(st.id);
                }
            );
        }

        //
        // TODO: Need to check for "more" link and if present need to request the statements
        //       for it recursively until we don't get any results or more links
        //

        assert.deepEqual(ids, group, "Returned statement list matches");

        next();
    }
);

module.exports = library;
