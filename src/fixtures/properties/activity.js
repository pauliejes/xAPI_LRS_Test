"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        fixtures.load(
            [
                "properties/activityDefinition"
            ],
            cfg
        );

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
                },
                forQuery: {
                    "id": "http://tincanapi.com/conformancetest/activityid/forQuery",
                    "definition": factory.make("forQuery activityDefinition")
                }
            }
        );
    }
};
