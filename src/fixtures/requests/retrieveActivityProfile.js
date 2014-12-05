"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        var lrs = cfg.lrs;

        fixtures.load(
            [
                "properties/activity"
            ],
            cfg
        );

        factory.register(
            "retrieveActivityProfile",
            {
                typical: {
                    "resource": "activities/profile",
                    "headers": {
                        "X-Experience-API-Version": lrs.version,
                        "Authorization": lrs.authString
                    },
                    "method": "GET",
                    "params": {
                        "activityId": factory.make("typical activity").id,
                        "profileId": "Activity profileId"
                    }
                }
            }
        );
    }
};
