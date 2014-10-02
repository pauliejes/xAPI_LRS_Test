/* global _suiteCfg */
"use strict";
var factory = require("../../utils/factory"),
    lrs = _suiteCfg.lrs;

factory.register(
    "getStatements",
    {
        typical: {
            "resource": "statements",
            "headers": {
                "X-Experience-API-Version": lrs.version,
                "Authorization": lrs.authString
            },
            "method": "GET",
            "params": {}
        }
    }
);
