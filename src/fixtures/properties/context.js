"use strict";
var factory = require("../../utils/factory");

require("./agent");
require("./group");
require("./contextActivities");
require("./statementRef");

factory.register(
    "context",
    {
        "empty": {},
        "typical": {},
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
        "allProperties": {
            "registration": "16fd2706-8baf-433b-82eb-8c7fada847da",
            "instructor": factory.make("typical agent"),
            "team": factory.make("typical group"),
            "contextActivities": factory.make("allProperties contextActivities"),
            "revision": "test",
            "platform": "test",
            // TODO: ?
            //"language": "en-US",
            "statement": factory.make("typical statementRef")
            // TODO: ?
            //"extensions":
        }
    }
);
