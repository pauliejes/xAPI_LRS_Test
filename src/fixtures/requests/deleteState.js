"use strict";
var factory = require("../../utils/factory"),
    lrsRes = require("../../utils/lrsResources"),
    deleteState
    ;

deleteState = {
    typical: {
        "resource": "activities/state",
        "headers": {
            "X-Experience-API-Version": lrsRes.version,
            "Authorization": lrsRes.authString,
        },
        "method": "DELETE",
        "params": {
            "stateId": "http://tincanapi.com/conformancetest/statedoc",
            "activityId": factory.make("typical activity").id,
            "agent": factory.make("typical agent")
        }
    },
    registered: {
        "resource": "activities/state",
        "headers": {
            "X-Experience-API-Version": lrsRes.version,
            "Authorization": lrsRes.authString,
        },
        "method": "DELETE",
        "params": {
            "stateId": "http://tincanapi.com/conformancetest/statedoc",
            "activityId": factory.make("typical activity").id,
            "agent": factory.make("typical agent"),
            "registration": factory.make("good UUID")
        }
    }
};

factory.register("deleteState", deleteState);