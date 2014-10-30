"use strict";
var factory = require("../../utils/factory");

module.exports = {
    init: function () {
        factory.register(
            "verb",
            {
                "empty": {},
                "voiding": {
                    "id": "http://adlnet.gov/expapi/verbs/voided",
                    "display": {
                        "en-US": "voided"
                    }
                },
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
    }
};
