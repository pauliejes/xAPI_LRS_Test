"use strict";
var factory = require("../../utils/factory"),
    groups;

require("./agent"),
groups = {
    "empty": {},
    "typical": {
        "objectType": "Group",
        "mbox": "mailto:test@test.com"
    },
    "mboxAndType": {
        "mbox": "mailto:test@tincan.edu",
        "objectType": "Group"
    },
    "mboxSha1AndType": {
        "mbox_sha1sum": "test",
        "objectType": "Group"
    },
    "openidAndType": {
        "openid": "alice.openid.example.org",
        "objectType": "Group"
    },
    "accountAndType": {
        "account": factory.make("typical agentAccount"),
        "objectType": "Group"
    },
    "mboxTypeAndName": {
        "objectType": "Group",
        "mbox": "mailto:test@test.com",
        "name": "test group"
    },
    "mboxSha1TypeAndName": {
        "objectType": "Group",
        "mbox_sha1sum": "test",
        "name": "test group"
    },
    "openidTypeAndName": {
        "objectType": "Group",
        "openid": "alice.openid.example.org",
        "name": "test group"
    },
    "accountTypeAndName": {
        "objectType": "Group",
        "account": factory.make("typical agentAccount"),
        "name": "test group"
    },
    "mboxTypeAndMember": {
        "objectType": "Group",
        "mbox": "mailto:test@test.com",
        "member": [factory.make("typical agent")],
    },
    "mboxSha1TypeAndMember": {
        "objectType": "Group",
        "member": [factory.make("typical agent")],
        "mbox_sha1sum": "test",
    },
    "openidTypeAndMember": {
        "objectType": "Group",
        "member": [factory.make("typical agent")],
        "openid": "alice.openid.example.org",
    },
    "accountTypeAndMember": {
        "objectType": "Group",
        "member": [factory.make("typical agent")],
        "account": factory.make("typical agentAccount"),
    },
    "allPropertiesTypicalAgentMember": {
        "objectType": "Group",
        "mbox": "mailto:test@test.com",
        "name": "test group",
        "member": [factory.make("typical agent")]
    },
    "allPropertiesMboxAgentMember": {
        "objectType": "Group",
        "mbox": "mailto:test@test.com",
        "name": "test group",
        "member": [factory.make("mboxOnly agent")]
    },
    "allPropertiesMboxSha1AgentMember": {
        "objectType": "Group",
        "mbox": "mailto:test@test.com",
        "name": "test group",
        "member": [factory.make("mboxSha1Only agent")]
    },
    "allPropertiesOpenidAgentMember": {
        "objectType": "Group",
        "mbox": "mailto:test@test.com",
        "name": "test group",
        "member": [factory.make("openidOnly agent")]
    },
    "allPropertiesAccountAgentMember": {
        "objectType": "Group",
        "mbox": "mailto:test@test.com",
        "name": "test group",
        "member": [factory.make("accountOnly agent")]
    },
    "allPropertiesTwoTypicalAgentsMember": {
        "objectType": "Group",
        "mbox": "mailto:test@test.com",
        "name": "test group",
        "member": [factory.make("typical agent"), factory.make("typical agent")]
    }
};

factory.register("group", groups);
