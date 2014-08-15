"use strict";
var factory = require("../../utils/factory"),
    activities;

require("./activityDefinition");

activities = {
    "empty": {},
    "typical": {
        "id": "http://tincanapi.com/conformancetest/activityid",
        "objectType": "Activity"
    },
    "idOnly": {
        "id": "http://tincanapi.com/conformancetest/activityid"
    },
    idAndObjectType: {
        "id": "http://tincanapi.com/conformancetest/activityid",
        "objectType": "Activity",
    },
    idAndDefinition: {
        "id": "http://tincanapi.com/conformancetest/activityid",
        "definition": factory.make("typical activityDefinition")
    },
    "allProperties": {
        "id": "http://tincanapi.com/conformancetest/activityid",
        "objectType": "Activity",
        "definition": factory.make("typical activityDefinition")
    }
};

factory.register("activity", activities);
