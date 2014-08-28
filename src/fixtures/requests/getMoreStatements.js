/* global _suiteCfg */
"use strict";
var factory = require("../../utils/factory"),
    lrs = _suiteCfg.lrs;

factory.register(
    "getMoreStatements",
    {
        typical: {
            "resource": "place holder url",
            "headers": {
                "X-Experience-API-Version": lrs.version,
                "Authorization": lrs.authString
            },
            "method": "GET"
        }
    }
);
