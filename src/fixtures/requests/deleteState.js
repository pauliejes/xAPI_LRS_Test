/* global _suiteCfg */
"use strict";
var factory = require("../../utils/factory"),
    lrs = _suiteCfg.lrs;

factory.register(
    "deleteState",
    {
        typical: {
            "resource": "activities/state",
            "headers": {
                "X-Experience-API-Version": lrs.version,
                "Authorization": lrs.authString,
            },
            "method": "DELETE",
            "params": {
                "stateId": "http://tincanapi.com/conformancetest/statedoc",
                "activityId": factory.make("typical activity").id,
                "agent": factory.make("typical agent")
            }
        },
        withRegistration: {
            "resource": "activities/state",
            "headers": {
                "X-Experience-API-Version": lrs.version,
                "Authorization": lrs.authString,
            },
            "method": "DELETE",
            "params": {
                "stateId": "http://tincanapi.com/conformancetest/statedoc",
                "activityId": factory.make("typical activity").id,
                "agent": factory.make("typical agent"),
                "registration": factory.make("good UUID")
            }
        }
    }
);
