"use strict";
var factory = require("../../utils/factory"),
    lrsRes = require("../../utils/lrsResources"),
    saveStatementsRequests
;

require("../properties/statement"),

saveStatementsRequests = {
    typical: function () {
        return {
            "resource": "statements",
            "headers": {
                "X-Experience-API-Version": lrsRes.version,
                "Authorization": lrsRes.authString,
                "Content-Type": "application/json"
            },
            "method": "POST",
            "content": [
                factory.make("typical statement"),
                factory.make("minimal statement")
            ]
        };
    }
};

factory.register("saveStatements", saveStatementsRequests);
