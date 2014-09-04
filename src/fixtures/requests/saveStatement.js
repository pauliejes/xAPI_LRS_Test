/* global _suiteCfg */
"use strict";
var factory = require("../../utils/factory"),
    lrs = _suiteCfg.lrs;

factory.register(
    "saveStatement",
    {
        minimal: {
            "resource": "statements",
            "headers": {
                "X-Experience-API-Version": lrs.version,
                "Authorization": lrs.authString,
                "Content-Type": "application/json"
            },
            "method": "POST",
            "params": {},
            "content": factory.make("minimal statement")
        },
        typical: function () {
            var obj = factory.make("typical statement");

            return {
                "resource": "statements",
                "headers": {
                    "X-Experience-API-Version": lrs.version,
                    "Authorization": lrs.authString,
                    "Content-Type": "application/json"
                },
                "method": "PUT",
                "params": {
                    "statementId": obj.id
                },
                "content": obj
            };
        },
        activity: function () {
            var obj = factory.make("typical statement");

            return {
                "resource": "statements",
                "headers": {
                    "X-Experience-API-Version": lrs.version,
                    "Authorization": lrs.authString,
                    "Content-Type": "application/json"
                },
                "method": "PUT",
                "params": {
                    "statementId": obj.id
                },
                "content": obj
            };
        }
    }
);
