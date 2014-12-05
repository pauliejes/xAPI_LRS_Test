"use strict";
var factory = require("../utils/factory"),
    fixtures = require("./loader"),
    MBOX_AGENT = "mboxAgent",
    MBOX_AGENT_RELATED = "mboxAgentRelated",
    MBOX_SHA1_AGENT = "mboxSha1Agent",
    MBOX_SHA1_AGENT_RELATED = "mboxSha1AgentRelated",
    ACTIVITY = "activity",
    RELATED_ACTIVITIES = "relatedActivities",
    VERB = "verb",
    REGISTRATION = "registration";

module.exports = {
    init: function (cfg) {
        fixtures.load(
            [
                "requests/saveStatement",
                "properties/agent",
                "properties/verb",
                "properties/activity",
                "properties/context"
            ],
            cfg
        );

        factory.register(
            "queryCfg",
            {
                plain: {
                    req: factory.make("typical saveStatement"),
                    tests: []
                },
                actorMboxAgent: function () {
                    var req = factory.make("typical saveStatement");
                    req.content.actor = factory.make("forQueryMbox agent");

                    return { req: req, tests: [ MBOX_AGENT, MBOX_AGENT_RELATED ] };
                },
                actorMboxSha1Agent: function () {
                    var req = factory.make("typical saveStatement");
                    req.content.actor = factory.make("forQueryMboxSha1 agent");

                    return { req: req, tests: [ MBOX_SHA1_AGENT, MBOX_SHA1_AGENT_RELATED ] };
                },
                objectActivity: function () {
                    var req = factory.make("typical saveStatement");
                    req.content.object = factory.make("forQuery activity");

                    return { req: req, tests: [ ACTIVITY, RELATED_ACTIVITIES ] };
                },
                verb: function () {
                    var req = factory.make("typical saveStatement");
                    req.content.verb = factory.make("forQuery verb");

                    return { req: req, tests: [ VERB ] };
                },
                registration: function (args) {
                    var req = factory.make("typical saveStatement");
                    req.content.context = {
                        registration: args.reg
                    };

                    return { req: req, tests: [ REGISTRATION ] };
                },
                contextActivityParent: function () {
                    var req = factory.make("typical saveStatement");
                    req.content.context = {
                        contextActivities: {
                            parent: [
                                factory.make("forQuery activity")
                            ]
                        }
                    };

                    return { req: req, tests: [ RELATED_ACTIVITIES ] };
                },
                contextActivityGrouping: function () {
                    var req = factory.make("typical saveStatement");
                    req.content.context = {
                        contextActivities: {
                            grouping: [
                                factory.make("forQuery activity")
                            ]
                        }
                    };

                    return { req: req, tests: [ RELATED_ACTIVITIES ] };
                },
                contextInstructorMboxAgent: function () {
                    var req = factory.make("typical saveStatement");
                    req.content.context = {
                        instructor: factory.make("forQueryMbox agent")
                    };

                    return { req: req, tests: [ MBOX_AGENT_RELATED ] };
                },
                contextInstructorMboxSha1Agent: function () {
                    var req = factory.make("typical saveStatement");
                    req.content.context = {
                        instructor: factory.make("forQueryMboxSha1 agent")
                    };

                    return { req: req, tests: [ MBOX_SHA1_AGENT_RELATED ] };
                }
            }
        );
    }
};
