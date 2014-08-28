/* global _suiteCfg */
"use strict";
var factory = require("../../utils/factory"),
    lrs = _suiteCfg.lrs;

factory.register(
    "saveStatements",
    {
        typical: function () {
            return {
                "resource": "statements",
                "headers": {
                    "X-Experience-API-Version": lrs.version,
                    "Authorization": lrs.authString,
                    "Content-Type": "application/json"
                },
                "method": "POST",
                "content": [
                    factory.make("typical statement"),
                    factory.make("minimal statement")
                ]
            };
        }
    }
);
