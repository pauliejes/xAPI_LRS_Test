"use strict";
var factory = require("../../utils/factory"),
    uuid = require("node-uuid");

factory.register(
    "UUID",
    {
        "good": function () {
            return uuid.v4();
        },
        "bad": "bad-uuid"
    }
);
