"use strict";
var factory = require("../../utils/factory");

factory.register(
    "interactionComponent",
    {
        "empty": {},
        "typical": {
            "id": "test"
        },
        "idOnly": {
            "id": "test"
        },
        "allProperties": {
            "id": "test",
            "description": {
                "en-US": "test"
            }
        }
    }
);
