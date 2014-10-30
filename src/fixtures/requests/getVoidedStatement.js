"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        var lrs = cfg.lrs;

        fixtures.load(
            [
                "properties/statement"
            ],
            cfg
        );

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
    }
};
