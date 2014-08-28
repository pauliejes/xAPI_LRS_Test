/* global _suiteCfg */
"use strict";
var factory = require("../../utils/factory"),
    lrs = _suiteCfg.lrs;

factory.register(
    "getVoidedStatement",
    {
        typical: {
            "resource": "statements",
            "headers": {
                "X-Experience-API-Version": lrs.version,
                "Authorization": lrs.authString
            },
            "method": "GET",
            "params": {
                "voidedStatementId": factory.make("typical statement").id
            }
        }
    }
);
