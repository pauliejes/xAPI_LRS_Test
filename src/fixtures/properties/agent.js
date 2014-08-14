"use strict";
var factory = require("../../utils/factory"),
    agents;

require("./agentAccount");

agents = {
    "empty": {},
    "typical": {
        "mbox": "mailto:test@tincan.edu",
        "objectType": "Agent"
    },
    "mboxAndType": {
        "mbox": "mailto:test@tincan.edu",
        "objectType": "Agent"
    },
    "mboxSha1AndType": {
        "mbox_sha1sum": "test",
        "objectType": "Agent"
    },
    "openidAndType": {
        "openid": "alice.openid.example.org",
        "objectType": "Agent"
    },
    "accountAndType": {
        "account": factory.make("typical agentAccount"),
        "objectType": "Agent"
    },
    "mboxOnly": {
        "mbox": "mailto:test@tincan.edu"
    },
    "mboxSha1Only": {
        "mbox_sha1sum": "test"
    },
    "openidOnly": {
        "openid": "alice.openid.example.org"
    },
    "accountOnly": {
        "account": factory.make("typical agentAccount")
    }
};

factory.register("agent", agents);
