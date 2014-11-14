"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        var lrs = cfg.lrs;

        fixtures.load(
            [
                "properties/activity",
                "properties/content"
            ],
            cfg
        );

        factory.register(
            "saveActivityProfile",
            {
                typical: {
                    "resource": "activities/profile",
                    "headers": {
                        "X-Experience-API-Version": lrs.version,
                        "Authorization": lrs.authString,
                        "Content-Type": "application/octet-stream"
                    },
                    "method": "PUT",
                    "params": {
                        "activityId": factory.make("typical activity").id,
                        "profileId": "Activity profileId"
                    },
                    "content": "some content"
                },
                JSON: {
                    "resource": "activities/profile",
                    "headers": {
                        "X-Experience-API-Version": lrs.version,
                        "Authorization": lrs.authString,
                        "Content-Type": "application/json"
                    },
                    "method": "PUT",
                    "params": {
                        "activityId": factory.make("typical activity").id,
                        "profileId": "Activity profileId"
                    },
                    "content": factory.make("JSON content")
                },
                ifNoneMatch: function () {
                    var obj = factory.make("typical saveActivityProfile");

                    obj.headers["If-None-Match"] = "*";
                    return obj;
                }
            }
        );
    }
};
