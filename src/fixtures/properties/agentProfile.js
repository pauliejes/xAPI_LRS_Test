"use strict";
var factory = require("../../utils/factory"),
    agentProfiles;

require("./agent");

agentProfiles = {
    "typical": function() {
        return {
            "id": "typical agent profile id",
            "agent": factory.make("typical agent")
        };
    }
};

factory.register("agentProfile", agentProfiles);
