/* global _suiteCfg */
"use strict";
var factory = require("../../utils/factory"),
    lrs = _suiteCfg.lrs;

factory.register(
    "saveState",
    {
        typical: {
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
                "Content-Type": "application/json"
            },
            "method": "PUT",
            "params": {
                "stateId": "http://tincanapi.com/conformancetest/statedoc",
                "activityId": factory.make("typical activity").id,
                "agent": factory.make("typical agent"),
                "registration": factory.make("good UUID")
            },
            "content": factory.make("JSON content")
        }
    }
);
