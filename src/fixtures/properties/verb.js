"use strict";
var factory = require("../../utils/factory");

factory.register(
    "verb",
    {
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
            "id": "http://tincanapi.com/conformancetest/verbid",
            "display": {
                "en-US": "test"
            }
        }
    }
);
