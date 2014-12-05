"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        var MBOX = "mailto:conformancetest-group@tincanapi.com",
            MBOX_SHA1SUM = "4e271041e78101311fb37284ef1a1d35c3f1db35",
            OPENID = "http://group.openid.tincanapi.com";

        fixtures.load(
            [
                "properties/agent",
                "properties/agentAccount"
            ],
            cfg
        );

        factory.register(
            "group",
            {
                "empty": {},
                "typical": {
                    "objectType": "Group",
                    "mbox": MBOX
                },
                "mboxAndType": {
                    "mbox": MBOX,
                    "objectType": "Group"
                },
                "mboxSha1AndType": {
                    "mbox_sha1sum": MBOX_SHA1SUM,
                    "objectType": "Group"
                },
                "openidAndType": {
                    "openid": OPENID,
                    "objectType": "Group"
                },
                "accountAndType": {
                    "account": factory.make("typical agentAccount"),
                    "objectType": "Group"
                },
                "mboxTypeAndName": {
                    "objectType": "Group",
                    "mbox": MBOX,
                    "name": "test group"
                },
                "mboxSha1TypeAndName": {
                    "objectType": "Group",
                    "mbox_sha1sum": MBOX_SHA1SUM,
                    "name": "test group"
                },
                "openidTypeAndName": {
                    "objectType": "Group",
                    "openid": OPENID,
                    "name": "test group"
                },
                "accountTypeAndName": {
                    "objectType": "Group",
                    "account": factory.make("typical agentAccount"),
                    "name": "test group"
                },
                "mboxTypeAndMember": {
                    "objectType": "Group",
                    "mbox": MBOX,
                    "member": [factory.make("typical agent")],
                },
                "mboxSha1TypeAndMember": {
                    "objectType": "Group",
                    "member": [factory.make("typical agent")],
                    "mbox_sha1sum": MBOX_SHA1SUM
                },
                "openidTypeAndMember": {
                    "objectType": "Group",
                    "member": [factory.make("typical agent")],
                    "openid": OPENID
                },
                "accountTypeAndMember": {
                    "objectType": "Group",
                    "member": [factory.make("typical agent")],
                    "account": factory.make("typical agentAccount"),
                },
                "allPropertiesTypicalAgentMember": {
                    "objectType": "Group",
                    "mbox": MBOX,
                    "name": "test group",
                    "member": [factory.make("typical agent")]
                },
                "allPropertiesMboxAgentMember": {
                    "objectType": "Group",
                    "mbox": MBOX,
                    "name": "test group",
                    "member": [factory.make("mboxOnly agent")]
                },
                "allPropertiesMboxSha1AgentMember": {
                    "objectType": "Group",
                    "mbox": MBOX,
                    "name": "test group",
                    "member": [factory.make("mboxSha1Only agent")]
                },
                "allPropertiesOpenidAgentMember": {
                    "objectType": "Group",
                    "mbox": MBOX,
                    "name": "test group",
                    "member": [factory.make("openidOnly agent")]
                },
                "allPropertiesAccountAgentMember": {
                    "objectType": "Group",
                    "mbox": MBOX,
                    "name": "test group",
                    "member": [factory.make("accountOnly agent")]
                },
                "allPropertiesTwoTypicalAgentsMember": {
                    "objectType": "Group",
                    "mbox": MBOX,
                    "name": "test group",
                    "member": [factory.make("typical agent"), factory.make("typical agent")]
                }
            }
        );
    }
};
