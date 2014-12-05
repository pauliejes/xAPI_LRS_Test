"use strict";
var factory = require("../../utils/factory");

module.exports = {
    init: function (cfg) {
        var lrs = cfg.lrs;

        factory.register(
            "fetchStatements",
            {
                "getStatement": {
                    "resource": "statements",
                    "headers": {
                        "X-Experience-API-Version": lrs.version,
                        "Authorization": lrs.authString
                    },
                    "method": "GET",
                    "params": {
                        "statementId": null
                    }
                },
                "getVoidedStatement": {
                    "resource": "statements",
                    "headers": {
                        "X-Experience-API-Version": lrs.version,
                        "Authorization": lrs.authString
                    },
                    "method": "GET",
                    "params": {
                        "voidedStatementId": null
                    }
                },
                "query": {
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
    }
};
