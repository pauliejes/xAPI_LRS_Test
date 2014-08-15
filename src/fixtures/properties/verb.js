"use strict";
var factory = require("../../utils/factory"),
    verbs;

verbs = {
    "empty": {},
    "typical": {
        "id": "http://tincanapi.com/conformancetest/verbid",
        "display": {
            "en-US": "test"
        }
    },
    "idOnly": {
        "id": "http://tincanapi.com/conformancetest/verbid"
    },
    "idAndDisplay": {
        "id": "http://tincanapi.com/TinCanJS/Test/Verb",
        "display": {
            "en-US": "test"
        }
    }
};

factory.register("verb", verbs);
