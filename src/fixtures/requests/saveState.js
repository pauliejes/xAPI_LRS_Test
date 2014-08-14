"use strict";
var factory = require("../../utils/factory"),
    lrsRes = require("../../utils/lrsResources"),
    saveState
    ;

saveState = {
    typical: {
        "resource": "activities/state",
        "headers": {
            "X-Experience-API-Version": lrsRes.version,
            "Authorization": lrsRes.authString,
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
    registered: {
        "resource": "activities/state",
        "headers": {
            "X-Experience-API-Version": lrsRes.version,
            "Authorization": lrsRes.authString,
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
};

factory.register("saveState", saveState);