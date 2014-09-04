"use strict";
var factory = require("../../utils/factory");

require("./agent");
require("./activity");
require("./verb");
require("./result");
require("./context");

factory.register(
    "subStatement",
    {
        "empty": {},
        "typical": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
        },
        "mboxOnlyAgentActor": {
            "objectType": "SubStatement",
            "actor": factory.make("mboxOnly agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
        },
        "mboxSha1OnlyAgentActor": {
            "objectType": "SubStatement",
            "actor": factory.make("mboxSha1Only agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
        },
        "openidOnlyAgentActor": {
            "objectType": "SubStatement",
            "actor": factory.make("openidOnly agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
        },
        "accountOnlyAgentActor": {
            "objectType": "SubStatement",
            "actor": factory.make("accountOnly agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
        },
        "mboxAndTypeAgentActor": {
            "objectType": "SubStatement",
            "actor": factory.make("mboxAndType agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
        },
        "mboxSha1AndTypeAgentActor": {
            "objectType": "SubStatement",
            "actor": factory.make("mboxSha1AndType agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
        },
        "openidAndTypeAgentActor": {
            "objectType": "SubStatement",
            "actor": factory.make("openidAndType agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
        },
        "accountAndTypeAgentActor": {
            "objectType": "SubStatement",
            "actor": factory.make("accountAndType agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
        },
        "mboxAndTypeGroupActor": {
            "objectType": "SubStatement",
            "actor": factory.make("mboxAndType group"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
        },
        "mboxSha1AndTypeGroupActor": {
            "objectType": "SubStatement",
            "actor": factory.make("mboxSha1AndType group"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
        },
        "openidAndTypeGroupActor": {
            "objectType": "SubStatement",
            "actor": factory.make("openidAndType group"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
        },
        "accountAndTypeGroupActor": {
            "objectType": "SubStatement",
            "actor": factory.make("accountAndType group"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
        },
        "idOnlyVerb": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("idOnly verb"),
            "object": factory.make("typical activity"),
        },
        "mboxOnlyAgentObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("mboxOnly agent"),
        },
        "mboxSha1OnlyAgentObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("mboxSha1Only agent"),
        },
        "openidOnlyAgentObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("openidOnly agent"),
        },
        "accountOnlyAgentObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("accountOnly agent"),
        },
        "mboxAndTypeAgentObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("mboxAndType agent"),
        },
        "mboxSha1AndTypeAgentObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("mboxSha1AndType agent"),
        },
        "openidAndTypeAgentObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("openidAndType agent"),
        },
        "accountAndTypeAgentObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("accountAndType agent"),
        },
        "mboxAndTypeGroupObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("mboxAndType group"),
        },
        "mboxSha1AndTypeGroupObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("mboxSha1AndType group"),
        },
        "openidAndTypeGroupObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("openidAndType group"),
        },
        "accountAndTypeGroupObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("accountAndType group"),
        },
        "allPropertiesTypicalAgentMemberGroupObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("allPropertiesTypicalAgentMember group")
        },
        "allPropertiesActivityObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("allProperties activity")
        },
        "typicalStatementRefObject": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical statementRef")
        },
        "allProperties": {
            "objectType": "SubStatement",
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
            "result": factory.make("typical result"),
            "context": factory.make("typical context")
        }
    }
);
