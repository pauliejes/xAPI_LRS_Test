/* global _suiteCfg */
"use strict";
var factory = require("../../utils/factory"),
    lrs = _suiteCfg.lrs;

factory.register(
    "clearState",
    {
        typical: {
            "resource": "activities/state",
            "headers": {
                "X-Experience-API-Version": lrs.version,
                "Authorization": lrs.authString,
            },
            "method": "DELETE",
            "params": {
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
                "activityId": factory.make("typical activity").id,
                "agent": factory.make("typical agent"),
                "registration": factory.make("good UUID")
            }
        }
    }
);
