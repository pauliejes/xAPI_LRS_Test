"use strict";
var factory = require("../../utils/factory"),
    interactionComponents;

interactionComponents = {
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
};

factory.register("interactionComponent", interactionComponents);
