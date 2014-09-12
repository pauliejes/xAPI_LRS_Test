"use strict";
var factory = require("../../utils/factory"),
    HOMEPAGE = "https://tincanapi.com";

factory.register(
    "agentAccount",
    {
        "empty": {},
        "typical": {
            "name": "test",
            "homePage": HOMEPAGE
        },
        "consumer": {
            "homePage": HOMEPAGE + "/OAuth/Token",
            "name": "oauth_consumer_x75db"
        },
        "allProperties": {
            "name": "test",
            "homePage": HOMEPAGE
        }
    }
);
