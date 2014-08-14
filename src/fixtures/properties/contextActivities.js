"use strict";
var factory = require("../../utils/factory"),
    contextActivities;

require("./activity");

contextActivities = {
    "empty": {},
    "typical": {},
    "categoryOnly": {
        "category": [
            factory.make("typical activity")
        ],
    },
    "parentOnly": {
        "parent": [
            factory.make("typical activity")
        ],
    },
    "groupingOnly": {
        "grouping": [
            factory.make("typical activity")
        ],
    },
    "otherOnly": {
        "other": [
            factory.make("typical activity")
        ],
    },
    "allProperties": {
        "category": [
            factory.make("typical activity")
        ],
        "parent": [
            factory.make("typical activity")
        ],
        "grouping": [
            factory.make("typical activity")
        ],
        "other": [
            factory.make("typical activity")
        ]
    }
};

factory.register("contextActivities", contextActivities);
