"use strict";
var factory = require("../../utils/factory");

factory.register(
    "timestamp",
    {
        "good": "2014-07-23T12:34:02-05:00",
        "bad": "bad-timestamp"
    }
);
