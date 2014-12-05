"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        var lrs = cfg.lrs;

        fixtures.load(
            [
                "properties/activity",
                "properties/agent",
                "properties/content",
                "properties/UUID"
            ],
            cfg
        );

        factory.register(
            "saveState",
            {
                typical: {
                    "resource": "activities/state",
                    "headers": {
                        "X-Experience-API-Version": lrs.version,
                        "Authorization": lrs.authString,
                        "Content-Type": "application/octet-stream"
                    },
                    "method": "PUT",
                    "params": {
                        "stateId": "http://tincanapi.com/conformancetest/statedoc",
                        "activityId": factory.make("typical activity").id,
                        "agent": factory.make("typical agent")
                    },
                    "content": "some content"
                },
                JSON: {
                    "resource": "activities/state",
                    "headers": {
                        "X-Experience-API-Version": lrs.version,
                        "Authorization": lrs.authString,
                        "Content-Type": "application/json"
                    },
                    "method": "PUT",
                    "params": {
                        "stateId": "http://tincanapi.com/conformancetest/statedoc",
                        "activityId": factory.make("typical activity").id,
                        "agent": factory.make("typical agent")
                    },
                    "content": factory.make("JSON content")
                },
                withRegistration: {
                    "resource": "activities/state",
                    "headers": {
                        "X-Experience-API-Version": lrs.version,
                        "Authorization": lrs.authString,
                        "Content-Type": "application/octet-stream"
                    },
                    "method": "PUT",
                    "params": {
                        "stateId": "http://tincanapi.com/conformancetest/statedoc",
                        "activityId": factory.make("typical activity").id,
                        "agent": factory.make("typical agent"),
                        "registration": factory.make("good UUID")
                    },
                    "content": "some content"
                },
                ifNoneMatch: function () {
                    var obj = factory.make("typical saveState");

                    obj.headers["If-None-Match"] = "*";
                    return obj;
                }
            }
        );
    }
};
