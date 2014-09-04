"use strict";
var factory = require("../../utils/factory");

require("./score");

factory.register(
    "result",
    {
        "empty": {},
        "typical": {},
        "scoreOnly": {
            "score": factory.make("typical score")
        },
        "emptyScoreOnly": {
            "score": factory.make("empty score")
        },
        "successOnly": {
            "success": true
        },
        "completionOnly": {
            "completion": true
        },
        "responseOnly": {
            "response": "test"
        },
        "durationOnly": {
            "duration": "PT2H"
        },
        "extensionsOnly": {
            "extensions": factory.make("multiplePairs extensions"),
        },
        "emptyExtensionsOnly": {
            "extensions": factory.make("empty extensions"),
        },
        "scoreAndSuccess": {
            "score": factory.make("typical score"),
            "success": true
        },
        "scoreAndCompletion": {
            "score": factory.make("typical score"),
            "completion": true
        },
        "scoreAndResponse": {
            "score": factory.make("typical score"),
            "response": "test"
        },
        "scoreAndDuration": {
            "score": factory.make("typical score"),
            "duration": "PT2H"
        },
        "successAndCompletion": {
            "success": true,
            "completion": true
        },
        "successAndResponse": {
            "success": true,
            "response": "test"
        },
        "successAndDuration": {
            "success": true,
            "duration": "PT2H"
        },
        "completionAndResponse": {
            "completion": true,
            "response": "test"
        },
        "completionAndDuration": {
            "completion": true,
            "duration": "PT2H"
        },
        "responseAndDuration": {
            "response": "test",
            "duration": "PT2H"
        },
        "scoreSuccessAndCompletion": {
            "score": factory.make("typical score"),
            "success": true,
            "completion": true
        },
        "scoreSuccessAndResponse": {
            "score": factory.make("typical score"),
            "success": true,
            "response": "test"
        },
        "scoreSuccessAndDuration": {
            "score": factory.make("typical score"),
            "success": true,
            "duration": "PT2H"
        },
        "scoreCompletionAndResponse": {
            "score": factory.make("typical score"),
            "completion": true,
            "response": "test"
        },
        "scoreCompletionAndDuration": {
            "score": factory.make("typical score"),
            "completion": true,
            "duration": "PT2H"
        },
        "scoreResponseAndDuration": {
            "score": factory.make("typical score"),
            "response": "test",
            "duration": "PT2H"
        },
        "successCompletionAndResponse": {
            "success": true,
            "completion": true,
            "response": "test"
        },
        "successCompletionAndDuration": {
            "success": true,
            "completion": true,
            "duration": "PT2H"
        },
        "successResponseAndDuration": {
            "success": true,
            "response": "test",
            "duration": "PT2H"
        },
        "completionResponseAndDuration": {
            "completion": true,
            "response": "test",
            "duration": "PT2H"
        },
        "scoreSuccessCompletionAndResponse": {
            "score": factory.make("typical score"),
            "success": true,
            "completion": true,
            "response": "test"
        },
        "scoreSuccessCompletionAndDuration": {
            "score": factory.make("typical score"),
            "success": true,
            "completion": true,
            "duration": "PT2H"
        },
        "successCompletionResponseAndDuration": {
            "success": true,
            "completion": true,
            "response": "test",
            "duration": "PT2H"
        },
        "allProperties": {
            "score": factory.make("typical score"),
            "success": true,
            "completion": true,
            "response": "test",
            "duration": "PT2H",
            "extensions": factory.make("typical extensions")
        }
    }
);
