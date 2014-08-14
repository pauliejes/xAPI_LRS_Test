"use strict";
var factory = require("../../utils/factory"),
    agentAccounts;

agentAccounts = {
    "empty": {},
    "typical": {
        "name": "test",
        "homePage": "test.com"
    },
    "allProperties": {
        "name": "test",
        "homePage": "test.com"
    }
};

factory.register("agentAccount", agentAccounts);
