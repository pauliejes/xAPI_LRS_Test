"use strict";
var factory = require("../../utils/factory"),
    MBOX = "mailto:conformancetest@tincanapi.com",
    MBOX_SHA1SUM = "db77b9104b531ecbb0b967f6942549d0ba80fda1",
    OPENID = "http://openid.tincanapi.com";

require("./agentAccount");

factory.register(
    "agent",
    {
        "empty": {},
        "typical": {
            "mbox": MBOX,
            "objectType": "Agent"
        },
        "mboxAndType": {
            "mbox": MBOX,
            "objectType": "Agent"
        },
        "mboxSha1AndType": {
            "mbox_sha1sum": MBOX_SHA1SUM,
            "objectType": "Agent"
        },
        "openidAndType": {
            "openid": OPENID,
            "objectType": "Agent"
        },
        "accountAndType": {
            "account": factory.make("typical agentAccount"),
            "objectType": "Agent"
        },
        "mboxOnly": {
            "mbox": MBOX
        },
        "mboxSha1Only": {
            "mbox_sha1sum": MBOX_SHA1SUM
        },
        "openidOnly": {
            "openid": OPENID
        },
        "accountOnly": {
            "account": factory.make("typical agentAccount")
        }
    }
);
