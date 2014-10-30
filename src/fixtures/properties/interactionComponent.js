"use strict";
var factory = require("../../utils/factory");

module.exports = {
    init: function () {
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
    }
};
