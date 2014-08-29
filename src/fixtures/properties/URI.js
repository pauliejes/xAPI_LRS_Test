"use strict";
var factory = require("../../utils/factory"),
    uuid = require("node-uuid");

factory.register(
    "URI",
    {
        "good": "http://tincanapi.com/conformancetest/",
        "bad": "bad uri",
        "unique": function() {
            return "http://tincanapi.com/conformancetest/uniqueUri/" + uuid.v4();
        }
    }
);
