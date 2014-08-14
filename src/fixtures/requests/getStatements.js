"use strict";
var factory = require("../../utils/factory"),
    lrsRes = require("../../utils/lrsResources"),
    getStatementsRequests
;

require("../properties/statement"),

getStatementsRequests = {
    typical: function () {
        return {
            "resource": "statements",
            "headers": {
                "X-Experience-API-Version": lrsRes.version,
                "Authorization": lrsRes.authString
            },
            "method": "GET",
            "params": {
                "statementId": [factory.make("typical statement id")]
            },
        };
    }
};

factory.register("getStatements", getStatementsRequests);
