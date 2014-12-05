"use strict";
var factory = require("../../utils/factory");

module.exports = {
    init: function () {
        factory.register(
            "extensions",
            {
                "empty": {},
                "typical": {
                    "http://id.tincanapi.com/extension/topic": "Conformance Testing"
                },
                "withObjectValue": {
                    "http://id.tincanapi.com/extension/color": { model: "RGB", value: "#FFFFFF" }
                },
                "withIntegerValue": {
                    "http://id.tincanapi.com/extension/starting-position": 1
                },
                "multiplePairs": {
                    "http://id.tincanapi.com/extension/topic": "Conformance Testing",
                    "http://id.tincanapi.com/extension/color": { model: "RGB", value: "#FFFFFF" },
                    "http://id.tincanapi.com/extension/starting-position": 1
                },
                "invalidNonIRI": {
                    "test": "key not an IRI"
                }
            }
        );
    }
};
