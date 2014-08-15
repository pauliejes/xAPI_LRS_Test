"use strict";
var factory = require("../../utils/factory"),
    activities;

require("./activityDefinition");

activities = {
    "empty": {},
    "typical": {
        "id": "http://example.org/absolute/URI/with/absolute/path/to/resource.txt",
        "objectType": "Activity"
    },
    "idOnly": {
        "id": "http://example.org/absolute/URI/with/absolute/path/to/resource.txt"
    },
    idAndObjectType: {
        "id": "http://example.org/absolute/URI/with/absolute/path/to/resource.txt",
        "objectType": "Activity",
    },
    idAndDefinition: {
        "id": "http://example.org/absolute/URI/with/absolute/path/to/resource.txt",
        "definition": factory.make("typical activityDefinition")
    },
    "allProperties": {
        "id": "http://example.org/absolute/URI/with/absolute/path/to/resource.txt",
        "objectType": "Activity",
        "definition": factory.make("typical activityDefinition")
    }
};

factory.register("activity", activities);
