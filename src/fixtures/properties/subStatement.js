"use strict";
var factory = require("../../utils/factory"),
    subStatements;

require("./agent");
require("./verb");
require("./result");
require("./context");

subStatements = {
    "empty": {},
    "typical": {
        "objectType": "SubStatement",
        "actor": factory.make("typical agent"),
        "verb": factory.make("typical verb"),
        "object": factory.make("typical agent"),
    },
    "mboxOnlyAgentActor": {
        "objectType": "SubStatement",
        "actor": factory.make("mboxOnly agent"),
        "verb": factory.make("typical verb"),
        "object": factory.make("typical agent"),
    },
    "mboxSha1OnlyAgentActor": {
        "objectType": "SubStatement",
        "actor": factory.make("mboxSha1Only agent"),
        "verb": factory.make("typical verb"),
        "object": factory.make("typical agent"),
    },
    "openidOnlyAgentActor": {
        "objectType": "SubStatement",
        "actor": factory.make("openidOnly agent"),
        "verb": factory.make("typical verb"),
        "object": factory.make("typical agent"),
    },
    "accountOnlyAgentActor": {
        "objectType": "SubStatement",
        "actor": factory.make("accountOnly agent"),
        "verb": factory.make("typical verb"),
        "object": factory.make("typical agent"),
    },
    "mboxAndTypeAgentActor": {
        "objectType": "SubStatement",
        "actor": factory.make("mboxAndType agent"),
        "verb": factory.make("typical verb"),
        "object": factory.make("typical agent"),
    },
    "mboxSha1AndTypeAgentActor": {
        "objectType": "SubStatement",
        "actor": factory.make("mboxSha1AndType agent"),
        "verb": factory.make("typical verb"),
        "object": factory.make("typical agent"),
    },
    "openidAndTypeAgentActor": {
        "objectType": "SubStatement",
        "actor": factory.make("openidAndType agent"),
        "verb": factory.make("typical verb"),
        "object": factory.make("typical agent"),
    },
    "accountAndTypeAgentActor": {
        "objectType": "SubStatement",
        "actor": factory.make("accountAndType agent"),
        "verb": factory.make("typical verb"),
        "object": factory.make("typical agent"),
    },
    "mboxAndTypeGroupActor": {
        "objectType": "SubStatement",
        "actor": factory.make("mboxAndType group"),
        "verb": factory.make("typical verb"),
        "object": factory.make("typical agent"),
    },
    "mboxSha1AndTypeGroupActor": {
        "objectType": "SubStatement",
        "actor": factory.make("mboxSha1AndType group"),
        "verb": factory.make("typical verb"),
        "object": factory.make("typical agent"),
    },
    "openidAndTypeGroupActor": {
        "objectType": "SubStatement",
        "actor": factory.make("openidAndType group"),
        "verb": factory.make("typical verb"),
        "object": factory.make("typical agent"),
    },
    "accountAndTypeGroupActor": {
        "objectType": "SubStatement",
        "actor": factory.make("accountAndType group"),
        "verb": factory.make("typical verb"),
        "object": factory.make("typical agent"),
    },
    "idOnlyVerb": {
        "objectType": "SubStatement",
        "actor": factory.make("typical agent"),
        "verb": factory.make("idOnly verb"),
        "object": factory.make("typical agent"),
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
        "object": factory.make("typical agent"),
        "result": factory.make("typical result"),
        "context": factory.make("typical context")
    }
};

factory.register("subStatement", subStatements);
