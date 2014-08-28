/* global _suiteCfg */
"use strict";
var factory = require("../../utils/factory"),
    lrs = _suiteCfg.lrs;

factory.register(
    "about",
    {
        typical: {
            "resource": "about",
            "headers": {
                "X-Experience-API-Version": lrs.version,
                "Authorization": lrs.authString
            },
            "method": "GET"
        },
        minimal: {
            "resource": "about",
            "method": "GET"
        }
    }
);
