"use strict";
var factory = require("../../utils/factory"),
    uuid = require("node-uuid"),
    uuids
    ;

uuids = {
    "good": function () {
        return uuid.v4();
    },
    "bad": "bad-uuid"
};

factory.register("UUID", uuids);
