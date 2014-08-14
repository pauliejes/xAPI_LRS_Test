"use strict";
var factory = require("../../utils/factory"),
    scores;

scores = {
    "empty": {},
    "typical": {
        "scaled": 1,
    },
    "scaledOnly": {
        "scaled": 1
    },
    "rawOnly": {
        "raw": 100
    },
    "minOnly": {
        "min": 0
    },
    "maxOnly": {
        "max": 100
    },
    "scaledAndRaw": {
        "scaled": 1,
        "raw": 100
    },
    "scaledAndMin": {
        "scaled": 1,
        "min": 0
    },
    "scaledAndMax": {
        "scaled": 1,
        "max": 100
    },
    "rawAndMin": {
        "raw": 100,
        "min": 0
    },
    "rawAndMax": {
        "raw": 100,
        "max": 100
    },
    "minAndMax": {
        "min": 0,
        "max": 100
    },
    "scaledRawAndMin": {
        "scaled": 1,
        "raw": 100,
        "min": 0
    },
    "scaledRawAndMax": {
        "scaled": 1,
        "raw": 100,
        "max": 100
    },
    "rawMinAndMax": {
        "raw": 100,
        "min": 0,
        "max": 100
    },
    "allProperties": {
        "scaled": 1,
        "raw": 100,
        "min": 0,
        "max": 100
    }
};

factory.register("score", scores);
