"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        var MBOX = "mailto:conformancetest@tincanapi.com",
            MBOX_SHA1SUM = "db77b9104b531ecbb0b967f6942549d0ba80fda1",
            OPENID = "http://openid.tincanapi.com",
            MBOX_QUERY = "mailto:conformancetest+query@tincanapi.com",
            MBOX_SHA1SUM_QUERY = "6954e807cfbfc5b375d185de32f05de269f93d6f",
            OPENID_QUERY = "http://openid.tincanapi.com/query";

        fixtures.load(
            [
                "properties/agentAccount"
            ],
            cfg
        );

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
                },
                "forQueryMbox": {
                    "mbox": MBOX_QUERY
                },
                "forQueryMboxSha1": {
                    "mbox_sha1sum": MBOX_SHA1SUM_QUERY
                },
                "forQueryOpenid": {
                    "openid": OPENID_QUERY
                },
                "forQueryAccount": {
                    "account": factory.make("forQuery agentAccount")
                }
            }
        );
    }
};
