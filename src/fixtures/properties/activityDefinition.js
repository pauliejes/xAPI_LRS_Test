"use strict";
var factory = require("../../utils/factory");

require("./interactionComponent");

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
            "type": "test"
        },
        "moreInfoOnly": {
            "moreInfo": "test"
        },
        "interactionTypeOnly": {
           "interactionType": "test"
        },
        "correctResponsesPatternOnly": {
            "correctResponsesPattern": []
        },
        "choicesOnly": {
            "choices": [
                factory.make("typical interactionComponent")
            ]
        },
        "scaleOnly": {
            "scale": [
                factory.make("typical interactionComponent")
            ]
        },
        "sourceOnly": {
            "source": [
                factory.make("typical interactionComponent")
            ]
        },
        "targetOnly": {
            "target": [
                factory.make("typical interactionComponent")
            ]
        },
        "stepsOnly": {
            "steps": [
                factory.make("typical interactionComponent")
            ]
        },
        "extensionsOnly": {
            "extensions": {
                "test": "extension"
            }
        },
        "allProperties": {
            "name": {
                "en-US": "test"
            },
            "description": {
                "en-US": "test"
            },
            "type": "test",
            "moreInfo": "test",
            "interactionType": "test",
            "correctResponsesPattern": [],
            "choices": [
                factory.make("typical interactionComponent")
            ],
            "scale": [
                factory.make("typical interactionComponent")
            ],
            "source": [
                factory.make("typical interactionComponent")
            ],
            "target": [
                factory.make("typical interactionComponent")
            ],
            "steps": [
                factory.make("typical interactionComponent")
            ],
            "extensions": {
                "test": "extension"
            }
        }
    }
);
