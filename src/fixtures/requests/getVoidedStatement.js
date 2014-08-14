"use strict";
var factory = require("../../utils/factory"),
    lrsRes = require("../../utils/lrsResources"),
    getVoidedStatementRequests;

require("../properties/statement"),

getVoidedStatementRequests = {
    typical: function () {
        return {
            "resource": "statements",
            "headers": {
                "X-Experience-API-Version": lrsRes.version,
                "Authorization": lrsRes.authString
            },
            "method": "GET",
            "params": {
                "voidedStatementId": factory.make("typical statment id")
            },
        };
    }
};

factory.register("getVoidedStatement", getVoidedStatementRequests);
