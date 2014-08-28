"use strict";
var factory = require("../../utils/factory");

factory.register(
    "agentAccount",
    {
        "empty": {},
        "typical": {
            "name": "test",
            "homePage": "tincanapi.com"
        },
        "consumer": {
            "homePage": "http://tincanapi.com/xAPI/OAuth/Token",
            "name": "oauth_consumer_x75db"
        },
        "allProperties": {
            "name": "test",
            "homePage": "tincanapi.com"
        }
    }
);
