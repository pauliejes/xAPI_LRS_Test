"use strict";
var factory = require("../../utils/factory"),
    timestamps
    ;

timestamps = {
    "good": "2014-07-23T12:34:02-05:00",
    "bad": "bad-timestamp"
};

factory.register("timestamp", timestamps);
