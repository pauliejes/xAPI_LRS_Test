"use strict";
var factory = require("../../utils/factory"),
    lrsRes = require("../../utils/lrsResources"),
    retrieveStateIds
    ;

retrieveStateIds = {
    typical: {
        "resource": "activities/state",
        "headers": {
            "X-Experience-API-Version": lrsRes.version,
            "Authorization": lrsRes.authString
        },
        "method": "GET",
        "params": {
            "activityId": factory.make("typical activity").id,
            "agent": factory.make("typical agent")
        }
    },
    registered: {
        "resource": "activities/state",
        "headers": {
            "X-Experience-API-Version": lrsRes.version,
            "Authorization": lrsRes.authString
        },
        "method": "GET",
        "params": {
            "activityId": factory.make("typical activity").id,
            "agent": factory.make("typical agent"),
            "registration": factory.make("good UUID")
        }
    },
    //TODO: since parameter and corresponding tests/cluster
};

factory.register("retrieveStateIds", retrieveStateIds);