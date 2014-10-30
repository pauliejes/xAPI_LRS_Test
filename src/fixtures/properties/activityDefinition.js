"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        fixtures.load(
            [
                "properties/interactionComponent",
                "properties/extensions"
            ],
            cfg
        );

        factory.register(
            "activityDefinition",
            {
                "empty": {},
                "typical": {},
                "nameOnly": {
                    "name": {
                        "en-US": "test"
                    }
                },
                "descriptionOnly": {
                    "description": {
                        "en-US": "test"
                    }
                },
                "typeOnly": {
                    "type": "http://id.tincanapi.com/activitytype/unit-test"
                },
                "moreInfoOnly": {
                    "moreInfo": "https://github.com/adlnet/xAPI_LRS_Test"
                },
                "extensionsOnly": {
                    "extensions": factory.make("multiplePairs extensions")
                },
                "emptyExtensionsOnly": {
                    "extensions": factory.make("empty extensions"),
                },
                "allProperties": {
                    "name": {
                        "en-US": "test"
                    },
                    "description": {
                        "en-US": "test"
                    },
                    "type": "http://id.tincanapi.com/activitytype/unit-test",
                    "moreInfo": "https://github.com/adlnet/xAPI_LRS_Test",
                    "extensions": factory.make("typical extensions")
                },

                //
                // need individual interaction type definitions, we can't
                // use allProperties because not all types use all component lists
                //
                "trueFalse": {
                   "interactionType": "true-false"
                },
                "fillIn": {
                   "interactionType": "fill-in"
                },
                "numeric": {
                   "interactionType": "numeric"
                },
                "other": {
                   "interactionType": "other"
                },
                "otherWithCorrectResponsesPattern": {
                    "interactionType": "other",
                    "correctResponsesPattern": ["test"]
                },
                "choice": {
                    "interactionType": "choice",
                    "choices": [
                        factory.make("typical interactionComponent")
                    ]
                },
                "sequencing": {
                    "interactionType": "sequencing",
                    "choices": [
                        factory.make("typical interactionComponent")
                    ]
                },
                "likert": {
                    "interactionType": "likert",
                    "scale": [
                        factory.make("typical interactionComponent")
                    ]
                },
                "matching": {
                    "interactionType": "matching",
                    "source": [
                        factory.make("typical interactionComponent")
                    ],
                    "target": [
                        factory.make("typical interactionComponent")
                    ]
                },
                "performance": {
                    "interactionType": "performance",
                    "steps": [
                        factory.make("typical interactionComponent")
                    ]
                }
            }
        );
    }
};
