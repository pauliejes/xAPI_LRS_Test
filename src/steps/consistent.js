"use strict";

var English = require("yadda").localisation.English,
    library = English.library(),
    assert = require("assert"),
    selectn = require("selectn"),
    moment = require("moment"),
    factory = require("../utils/factory"),
    makeRequest = require("../utils/request").makeRequest,
    statementIdRe = /([-\w]+)\.json$/,
    objectTypeLocations,
    objectTypeLocationsMultiple,
    correctObjectTypes,
    assertStatementMatch;

require("../fixtures");

//
// it is acceptable for an LRS to insert 'objectType' properties
// in objects upon return, so we need to munge the compared objects
// when either the test suite provides that property and the LRS doesn't,
// or when the LRS inserts them and they weren't used in the test suite
//
// to do so we need to identify all objects that allow for an
// 'objectType' property and then check all places in a statement
// that can hold that particular type
//
// object types: Agent, Group, Activity, SubStatement, StatementRef
//
objectTypeLocations = [
    "actor",
    "object",
    "context.instructor",
    "context.team",
    "context.statement"
];

//
// each of these locations is like the above, but they can contain
// multiple of a given type of object, so need to loop over them
// then loop over their contents (when present) and do the same
// action
//
objectTypeLocationsMultiple = [
    "actor.member",
    "context.instructor.member",
    "context.team.member",
    "context.contextActivities.category",
    "context.contextActivities.parent",
    "context.contextActivities.grouping",
    "context.contextActivities.other"
];

correctObjectTypes = function (actual, expected) {
    objectTypeLocations.forEach(
        function (location) {
            var actualSubObj = selectn(location, actual),
                expectedSubObj = selectn(location, expected);

            if (! expectedSubObj) {
                return;
            }

            //
            // if the LRS provided objectType and we didn't then add
            // the LRS' copy to our expected object
            //
            if (typeof actualSubObj.objectType !== "undefined" && typeof expectedSubObj.objectType === "undefined") {
                expectedSubObj.objectType = actualSubObj.objectType;
            }
        }
    );

    objectTypeLocationsMultiple.forEach(
        function (location) {
            var actualSubObj = selectn(location, actual),
                expectedSubObj = selectn(location, expected);

            //
            // per the spec the LRS must return arrays, even if given a single
            // object originally
            //
            if (! expectedSubObj || ! Array.isArray(actualSubObj)) {
                return;
            }

            actualSubObj.forEach(
                function (v, i) {
                    //
                    // if the LRS provided objectType and we didn't then add
                    // the LRS' copy to our expected object
                    //
                    if (typeof v.objectType !== "undefined" && typeof expectedSubObj[i].objectType === "undefined") {
                        expectedSubObj[i].objectType = v.objectType;
                    }
                }
            );
        }
    );
};

//
// TODO: pull this and any other custom assertions out into
//       a module that probably extends the core assertion
//       library so that it can be required once in all the places
//
assertStatementMatch = function (actual, expected) {
    //
    // adjust statement for things the LRS must set
    //
    if (typeof expected.id === "undefined") {
        expected.id = this.scenarioResource.id;
    }

    expected.version = "1.0.0";

    //
    // we can't know the stored and authority ahead of time
    // but checking for their existence should be a request
    // test rather than a returned statement structure check
    //
    delete actual.stored;
    delete actual.authority;

    //
    // correct for mutable objectTypes
    //
    correctObjectTypes(actual, expected);

    //
    // for each of the locations they may also exist in a SubStatement
    // so need to be checked for when the 'object.objectType' is set to
    // 'SubStatement'
    //
    if (actual.object.objectType === "SubStatement") {
        correctObjectTypes(actual.object, expected.object);
    }

    //
    // check the timestamp independently as it needs to be a datetime
    // comparison rather than just a string comparison based on the same
    // reasoning as the objectType part above
    //
    if (typeof expected.timestamp !== "undefined") {
        //
        // this is a known issue in moment.js dealing with 2 digit TZ offsets,
        // but we can safely detect a two digit offset and tack on ":00" and be
        // safe until the isssue is fixed in the lib, see:
        //
        // https://github.com/moment/moment/issues/1723
        //
        if (/[-+]\d\d$/.test(expected.timestamp)) {
            expected.timestamp += ":00";
        }
        assert.ok(moment(expected.timestamp, moment.ISO_8601).isSame(moment(actual.timestamp, moment.ISO_8601)), "retrieved statement timestamp matches");
        delete expected.timestamp;
    }
    delete actual.timestamp;

    if (actual.object.objectType === "SubStatement") {
        delete actual.object.version;
    }

    assert.deepEqual(actual, expected, "retrieved statement matches saved statement");
};

library.given(
    "a loadable statement with filename: $filename",
    function (filename, next) {
        var loadable = __dirname + "/../var/statements/" + filename;

        this.scenarioResource.filename = filename;
        this.scenarioResource.loadedData = require(loadable);

        next();
    }
);

library.when(
    "the statement is retrieved",
    function (next) {
        var result = statementIdRe.exec(this.scenarioResource.filename);
        if (result === null) {
            next("Cannot parse statement id from filename: " + this.scenarioResource.filename);
            return;
        }

        this.scenarioResource.request = factory.make("typical getStatement");
        this.scenarioResource.id = this.scenarioResource.request.params.statementId = result[1];

        makeRequest(
            this.scenarioResource,
            function () {
                if (this.scenarioResource.response.statusCode !== 200) {
                    next("Unable to retrieve statement " + this.scenarioResource.id + ": " + this.scenarioResource.response.body + " (" + this.scenarioResource.response.statusCode + ")");
                    return;
                }

                this.scenarioResource.statement = JSON.parse(this.scenarioResource.response.body);
                next();
            }.bind(this)
        );
    }
);

library.then(
    "the statement structure matches",
    function (next) {
        var expected = this.scenarioResource.loadedData.structure,
            actual = this.scenarioResource.statement;

        assertStatementMatch(actual, expected);
        next();
    }
);

module.exports = library;
