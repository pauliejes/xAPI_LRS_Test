"use strict";
var factory = require("../../utils/factory"),
    agentAccounts;

agentAccounts = {
    "empty": {},
    "typical": {
        "name": "test",
        "homePage": "test.com"
    },
    "consumer": {
        "homePage": "http://example.com/xAPI/OAuth/Token",
        "name": "oauth_consumer_x75db"
    },
    "allProperties": {
        "name": "test",
        "homePage": "test.com"
    }
};

factory.register("agentAccount", agentAccounts);
