"use strict";
var factory = require("../../utils/factory");

require("./agent");
require("./verb");
require("./result");
require("./score");
require("./context");

factory.register(
    "statement",
    {
        "empty": {},
        "minimal": {
            "actor": factory.make("typical agent"),
            "verb": factory.make("typical verb"),
            "object": factory.make("typical activity"),
        },
        "typical": function () {
            return {
                "actor": factory.make("typical agent"),
                "verb": factory.make("typical verb"),
                "object": factory.make("typical activity"),
                "id": factory.make("good UUID"),
                "timestamp": "2014-07-23T12:34:02-05:00"
            };
        }
    }
);
