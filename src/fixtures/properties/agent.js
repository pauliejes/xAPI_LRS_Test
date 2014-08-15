"use strict";
var factory = require("../../utils/factory"),
    agents;

require("./agentAccount");

agents = {
    "empty": {},
    "typical": {
        "mbox": "mailto:conformancetest@tincanapi.com",
        "objectType": "Agent"
    },
    "mboxAndType": {
        "mbox": "mailto:conformancetest@tincanapi.com",
        "objectType": "Agent"
    },
    "mboxSha1AndType": {
        "mbox_sha1sum": "test",
        "objectType": "Agent"
    },
    "openidAndType": {
        "openid": "brian.openid.tincanapi.com",
        "objectType": "Agent"
    },
    "accountAndType": {
        "account": factory.make("typical agentAccount"),
        "objectType": "Agent"
    },
    "mboxOnly": {
        "mbox": "mailto:conformancetest@tincanapi.com"
    },
    "mboxSha1Only": {
        "mbox_sha1sum": "test"
    },
    "openidOnly": {
        "openid": "brian.openid.tincanapi.com"
    },
    "accountOnly": {
        "account": factory.make("typical agentAccount")
    }
};

factory.register("agent", agents);
