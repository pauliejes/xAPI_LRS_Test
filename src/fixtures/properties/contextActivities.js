"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        fixtures.load(
            [
                "properties/activity"
            ],
            cfg
        );

        factory.register(
            "contextActivities",
            {
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
                "allPropertiesEmpty": {
                    "category": [],
                    "parent": [],
                    "grouping": [],
                    "other": []
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
            }
        );
    }
};
