"use strict";
var factory = require("../../utils/factory"),
    statements;

require("./agent");
require("./verb");
require("./result");
require("./score");
require("./context");

statements = {
    "empty": {},
    "minimal": {
        "actor": factory.make("typical agent"),
        "verb": factory.make("typical verb"),
        "object": factory.make("typical agent"),
    },
    "typical": function () {
        return {
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical agent"),
            "id": factory.make("good UUID"),
            "timestamp": "2014-07-23T12:34:02-05:00"
        };
    },
    "full": function () {
        return {
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical agent"),
            "id": factory.make("good UUID"),
            "timestamp": "2014-07-23T12:34:02-05:00",
            "result": factory.make("typical result"),
            "score": factory.make("typical score"),
            "context": factory.make("typical context"),
            /*"authority": {
             "objectType": "Agent",
             "mbox": "mailto:test@test.com"
             }*/
        };
    }
};

factory.register("statement", statements);
