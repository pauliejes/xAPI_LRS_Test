/* global _suiteCfg */
"use strict";
var factory = require("../../utils/factory"),
    lrs = _suiteCfg.lrs;

factory.register(
    "getStatement",
    {
        typical: {
            "resource": "statements",
            "headers": {
                "X-Experience-API-Version": lrs.version,
                "Authorization": lrs.authString
            },
            "method": "GET",
            "params": {
                // TODO: allow this to be null or undefined,
                //       probably need a typicalWithId or something
                "statementId": factory.make("typical statement").id
            }
        }
    }
);
