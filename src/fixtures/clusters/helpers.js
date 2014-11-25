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
                        assert.equal(JSON.parse(res.headers.etag).toLowerCase(), "65cbc681ec3569a393a39193fbef6796a4ac4dfe");
                    }
                };

            obj.main.content = "Document concurrency test: noneMatch";

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
                        assert.equal(JSON.parse(res.headers.etag).toLowerCase(), "17e274dd7111c26df6dbca86188da48aedd5889c");
                    }
                };

            obj.primers[0].content = "Document concurrency test: incorrectNoneMatch";

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
                        assert.equal(JSON.parse(res.headers.etag).toLowerCase(), "3b4cda1f65580c68cdd2172d90557935fd63d7ad");
                    }
                };

            obj.primers[0].content = "Document concurrency test: correctMatch";

            obj.main.headers["If-Match"] = "e5fce8f9a08ed3d75cbe2ebc38574e1afd0bc13c";
            obj.main.content = "Document concurrency test: correctMatch (updated)";

            return obj;
        },
        correctMatchUpperCaseEtag: function (docType) {
            var doc = fixType(docType),
                obj = {
                    primers: [
                        factory.make("ifNoneMatch save" + doc)
                    ],
                    main: factory.make("typical save" + doc),
                    verify: factory.make("typical retrieve" + doc),
                    validate: function (res) {
                        assert.equal(JSON.parse(res.headers.etag).toLowerCase(), "b9db46658e0212f675d6628bafa1fc3a5a786fb3");
                    }
                };

            obj.primers[0].content = "Document concurrency test: correctMatchUpperCaseEtag";

            obj.main.headers["If-Match"] = "B757C3E7F20C8456B7AB3B3C6D9ADB50B5236787";
            obj.main.content = "Document concurrency test: correctMatchUpperCaseEtag (updated)";

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
                        assert.equal(JSON.parse(res.headers.etag).toLowerCase(), "751471f1b96cec29d5aae5d6cdffac9913d1a757");
                    }
                };

            obj.primers[0].content = "Document concurrency test: incorrectMatch";

            obj.main.headers["If-Match"] = "b7a124bf1d7a7c522c20861fbadfa8fa2b5e0999"; //Intentionally incorrect hash
            obj.main.content = "Document concurrency test: incorrectMatch (updated)"; //Should not be the retrieved body

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
                        assert.equal(JSON.parse(res.headers.etag).toLowerCase(), "30ca9efbe456c8de6f15d3df2c91b41156b2785a");
                    }
                };

            obj.primers[0].content = "Document concurrency test: ifMatchAndIfNoneMatch";

            obj.main.headers["If-Match"] = "30ca9efbe456c8de6f15d3df2c91b41156b2785a";
            obj.main.headers["If-None-Match"] = "*";
            obj.main.content = "Document concurrency test: ifMatchAndIfNoneMatch (updated)";

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
                        assert.equal(JSON.parse(res.headers.etag).toLowerCase(), "dde22d9fdc3a89a9b6edcfcab2469990217e806c");
                    }
                };

            obj.primers[0].content = "Document concurrency test: noMatchHeaders";

            obj.main.content = "Document concurrency test: noMatchHeaders (updated)"; //Should not be the retrieved body

            return obj;
        }
    }
};
