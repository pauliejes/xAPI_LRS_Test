"use strict";
var factory = require("../../utils/factory");

require("./activityDefinition");

factory.register(
    "activity",
    {
        empty: {},
        typical: {
            "id": "http://tincanapi.com/conformancetest/activityid",
            "objectType": "Activity"
        },
        idOnly: {
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
        allProperties: {
            "id": "http://tincanapi.com/conformancetest/activityid",
            "objectType": "Activity",
            "definition": factory.make("typical activityDefinition")
        }
    }
);
