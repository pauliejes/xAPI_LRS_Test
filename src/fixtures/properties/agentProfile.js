"use strict";
var factory = require("../../utils/factory");

require("./agent");

factory.register(
    "agentProfile",
    {
        "typical": function () {
            return {
                "id": "typical agent profile id",
                "agent": factory.make("typical agent")
            };
        }
    }
);
