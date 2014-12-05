"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        fixtures.load(
            [
                "properties/agent",
                "properties/group",
                "properties/contextActivities",
                "properties/statementRef",
                "properties/extensions"
            ],
            cfg
        );

        factory.register(
            "context",
            {
                "empty": {},
                "typical": {},
                "typicalAgentInstructor": {
                    "instructor": factory.make("typical agent")
                },
                "mboxAndTypeAgentInstructor": {
                    "instructor": factory.make("mboxAndType agent"),
                },
                "mboxSha1AndTypeAgentInstructor": {
                    "instructor": factory.make("mboxSha1AndType agent"),
                },
                "openidAndTypeAgentInstructor": {
                    "instructor": factory.make("openidAndType agent"),
                },
                "accountAndTypeAgentInstructor": {
                    "instructor": factory.make("accountAndType agent"),
                },
                "typicalGroupTeam": {
                    "team": factory.make("typical group")
                },
                "statementOnly": {
                    "statement": factory.make("typical statementRef")
                },
                "extensionsOnly": {
                    "extensions": factory.make("typical extensions")
                },
                "emptyExtensionsOnly": {
                    "extensions": factory.make("empty extensions")
                },
                "emptyContextActivities": {
                    "contextActivities": factory.make("empty contextActivities")
                },
                "emptyContextActivitiesAllPropertiesEmpty": {
                    "contextActivities": factory.make("allPropertiesEmpty contextActivities")
                },
                "contextActivitiesAllPropertiesOnly": {
                    "contextActivities": factory.make("allProperties contextActivities"),
                },
                "allProperties": {
                    "registration": "16fd2706-8baf-433b-82eb-8c7fada847da",
                    "instructor": factory.make("typical agent"),
                    "team": factory.make("typical group"),
                    "contextActivities": factory.make("allProperties contextActivities"),
                    "revision": "test",
                    "platform": "test",
                    "language": "en-US",
                    "statement": factory.make("typical statementRef"),
                    "extensions": factory.make("typical extensions")
                }
            }
        );
    }
};
