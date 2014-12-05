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
    }
};
