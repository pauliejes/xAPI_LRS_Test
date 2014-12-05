"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        var lrs = cfg.lrs;

        fixtures.load(
            [
                "properties/agent",
                "properties/content"
            ],
            cfg
        );

        factory.register(
            "saveAgentProfile",
            {
                typical: {
                    "resource": "agents/profile",
                    "headers": {
                        "X-Experience-API-Version": lrs.version,
                        "Authorization": lrs.authString,
                        "Content-Type": "application/octet-stream"
                    },
                    "method": "PUT",
                    "params": {
                        "agent": factory.make("typical agent"),
                        "profileId": "Agent profileId"
                    },
                    "content": "some content"
                },
                JSON: {
                    "resource": "agents/profile",
                    "headers": {
                        "X-Experience-API-Version": lrs.version,
                        "Authorization": lrs.authString,
                        "Content-Type": "application/json"
                    },
                    "method": "PUT",
                    "params": {
                        "agent": factory.make("typical agent"),
                        "profileId": "Agent profileId"
                    },
                    "content": factory.make("JSON content")
                },
                ifNoneMatch: function () {
                    var obj = factory.make("typical saveAgentProfile");

                    obj.headers["If-None-Match"] = "*";
                    return obj;
                }
            }
        );
    }
};
