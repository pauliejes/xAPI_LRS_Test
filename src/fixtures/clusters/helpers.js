"use strict";
var factory = require("../../utils/factory"),
    assert = require("assert"),
    mergeRequests,
    fixType;

mergeRequests = function (docType, primeBody, mainBody, validateBody) {
    var obj = {
            primers: [
                factory.make("JSON save" + docType)
            ],
            main: factory.make("JSON save" + docType),
            verify: factory.make("typical retrieve" + docType),
            validate: function (res) {
                assert.deepEqual(
                    JSON.parse(res.body),
                    validateBody,
                    "retrieved body matches expected body"
                );
            }
        };

    obj.main.method = "POST";

    obj.primers[0].content = JSON.stringify(primeBody);
    obj.main.content = JSON.stringify(mainBody);

    return obj;
};

fixType = function (str) {
    str = str.toLowerCase();

    switch (str) {
        case "state":
            return "State";
        case "agentprofile":
            return "AgentProfile";
        case "activityprofile":
            return "ActivityProfile";
        default:
            throw new Error ("Invalid document type: must be state, agentProfile, or activityProfile");
    }
};

module.exports = {
    merging: {
        shallow: function (docType) {
            return mergeRequests(
                fixType(docType),
                {
                    item: 1,
                    tin: "can"
                },
                {
                    item: 3,
                    conformance: "test"
                },
                {
                    item: 3,
                    tin: "can",
                    conformance: "test"
                }
            );
        },
        deep: function (docType) {
            return mergeRequests(
                fixType(docType),
                {
                    item: 1,
                    tin: {
                        can: "api",
                        deep: "test"
                    }
                },
                {
                    tin: {
                        deep: "element",
                        value: 2
                    },
                    conformance: "test"
                },
                {
                    item: 1,
                    tin: {
                        deep: "element",
                        value: 2
                    },
                    conformance: "test"
                }
            );
        },
        mergeJSONWithNotJSON: function (docType) {
            var doc = fixType(docType),
                primebody = "some not JSON content",
                obj = {
                    primers: [
                        factory.make("typical save" + doc)
                    ],
                    main: factory.make("JSON save" + doc),
                    verify: factory.make("typical retrieve" + doc),
                    validate: function (res) {
                        assert.equal(
                            res.body,
                            primebody,
                            "retrieved body matches expected body"
                        );
                    }
                };

            obj.main.method = "POST";

            obj.primers[0].content = primebody;

            return obj;
        },
        mergeNotJSONWithJSON: function (docType) {
            var doc = fixType(docType),
                primebody = {
                    item: 1,
                    tin: "can"
                },
                obj = {
                    primers: [
                        factory.make("JSON save" + doc)
                    ],
                    main: factory.make("typical save" + doc),
                    verify: factory.make("typical retrieve" + doc),
                    validate: function (res) {
                        assert.deepEqual(
                            JSON.parse(res.body),
                            primebody,
                            "retrieved body matches expected body"
                        );
                    }
                };

            obj.main.method = "POST";

            obj.primers[0].content = primebody;

            return obj;
        }
    },
    concurrency: {
        noneMatch: function (docType) {
            var doc = fixType(docType),
                obj = {
                    main: factory.make("ifNoneMatch save" + doc),
                    verify: factory.make("typical retrieve" + doc),
                    validate: function (res) {
                        assert.equal(JSON.parse(res.headers.etag), "E8A5EA8A123A6C2A6564EEE11A18515987E67180");
                    }
                };

            obj.main.content = "State concurrency test: noneMatch";

            return obj;
        },
        incorrectNoneMatch: function (docType) {
            var doc = fixType(docType),
                obj = {
                    primers: [
                        factory.make("ifNoneMatch save" + doc)
                    ],
                    main: factory.make("ifNoneMatch save" + doc),
                    verify: factory.make("typical retrieve" + doc),
                    validate: function (res) {
                        assert.equal(JSON.parse(res.headers.etag), "1D38C5049FCD9751670D1C3A25CCDAF03FF539DE");
                    }
                };

            obj.primers[0].content = "State concurrency test: incorrectNoneMatch";

            obj.main.content = "State concurrency test: incorrectNoneMatch (updated)"; //Should not be the retrieved body

            return obj;
        },
        correctMatch: function (docType) {
            var doc = fixType(docType),
                obj = {
                    primers: [
                        factory.make("ifNoneMatch save" + doc)
                    ],
                    main: factory.make("typical save" + doc),
                    verify: factory.make("typical retrieve" + doc),
                    validate: function (res) {
                        assert.equal(JSON.parse(res.headers.etag), "7DF0C8281AEE431BF31E0BE1402821069BDB63A3");
                    }
                };

            obj.primers[0].content = "State concurrency test: correctMatch";

            obj.main.headers["If-Match"] = "B7A124BF1D7A7C522C20861FCDD3F8FA2B5E0999";
            obj.main.content = "State concurrency test: correctMatch (updated)";

            return obj;
        },
        incorrectMatch: function (docType) {
            var doc = fixType(docType),
                obj = {
                    primers: [
                        factory.make("ifNoneMatch save" + doc)
                    ],
                    main: factory.make("typical save" + doc),
                    verify: factory.make("typical retrieve" + doc),
                    validate: function (res) {
                        assert.equal(JSON.parse(res.headers.etag), "2874D36A921964527A5D8E324156195E8D92D535");
                    }
                };

            obj.primers[0].content = "State concurrency test: incorrectMatch";

            obj.main.headers["If-Match"] = "B7A124BF1D7A7C522C20861FBADFA8FA2B5E0999"; //Intentionally incorrect hash
            obj.main.content = "State concurrency test: correctMatch (updated)"; //Should not be the retrieved body

            return obj;
        },
        ifMatchAndIfNoneMatch: function (docType) {
            var doc = fixType(docType),
                obj = {
                    primers: [
                        factory.make("ifNoneMatch save" + doc)
                    ],
                    main: factory.make("typical save" + doc),
                    verify: factory.make("typical retrieve" + doc),
                    validate: function (res) {
                        assert.equal(JSON.parse(res.headers.etag), "0882987B346371FFC65CA1174B498A2CD17702DD");
                    }
                };

            obj.primers[0].content = "State concurrency test: ifMatchAndIfNoneMatch";

            obj.main.headers["If-Match"] = "0882987B346371FFC65CA1174B498A2CD17702DD";
            obj.main.headers["If-None-Match"] = "*";
            obj.main.content = "State concurrency test: ifMatchAndIfNoneMatch (updated)";

            return obj;
        },
        noMatchHeaders: function (docType) {
            var doc = fixType(docType),
                obj = {
                    primers: [
                        factory.make("ifNoneMatch save" + doc)
                    ],
                    main: factory.make("typical save" + doc),
                    verify: factory.make("typical retrieve" + doc),
                    validate: function (res) {
                        assert.equal(JSON.parse(res.headers.etag), "53BEA471EFAE29B21CD1746E8F8C1FE1FDE708D8");
                    }
                };

            obj.primers[0].content = "State concurrency test: noMatchHeaders";

            obj.main.content = "State concurrency test: noMatchHeaders (updated)"; //Should not be the retrieved body

            return obj;
        }
    }
};
