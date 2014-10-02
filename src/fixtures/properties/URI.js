"use strict";
var factory = require("../../utils/factory");

factory.register(
    "URI",
    {
        "good": "http://tincanapi.com/conformancetest/",
        "bad": "uriwithoutscheme.tincanapi.com"
    }
);
