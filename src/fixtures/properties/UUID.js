"use strict";
var factory = require("../../utils/factory"),
    uuid = require("node-uuid");

factory.register(
    "UUID",
    {
        "good": "39e24cc4-69af-4b01-a824-1fdc6ea8a3af",
        "bad": "bad-uuid",

        //
        // presumably all UUIDs are naturally "unique", but this is a
        // "unique" fixture per call to `factory.make`, which should only
        // be used when constructing statements since they can be voided
        // without a specific clean up step
        //
        "unique": function () {
            return uuid.v4();
        }
    }
);
