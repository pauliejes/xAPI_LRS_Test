"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        var lrs = cfg.lrs;

        fixtures.load(
            [
                "properties/agent"
            ],
            cfg
        );

        factory.register(
            "deleteAgentProfile",
            {
                typical: {
                    "resource": "agents/profile",
                    "headers": {
                        "X-Experience-API-Version": lrs.version,
                        "Authorization": lrs.authString,
                    },
                    "method": "DELETE",
                    "params": {
                        "agent": factory.make("typical agent"),
                        "profileId": "Agent profileId"
                    }
                }
            }
        );
    }
};
