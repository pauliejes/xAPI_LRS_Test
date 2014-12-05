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
            "deleteActivityProfile",
            {
                typical: {
                    "resource": "activities/profile",
                    "headers": {
                        "X-Experience-API-Version": lrs.version,
                        "Authorization": lrs.authString,
                    },
                    "method": "DELETE",
                    "params": {
                        "activityId": factory.make("typical activity").id,
                        "profileId": "Activity profileId"
                    }
                }
            }
        );
    }
};
