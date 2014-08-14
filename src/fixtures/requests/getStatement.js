"use strict";
var factory = require("../../utils/factory"),
    lrsRes = require("../../utils/lrsResources"),
    getStatementRequests;

require("../properties/statement");

getStatementRequests = {
    typical: function () {
        return {
            "resource": "statements",
            "headers": {
                "X-Experience-API-Version": lrsRes.version,
                "Authorization": lrsRes.authString
            },
            "method": "GET",
            "params": {
                // TODO: allow this to be null or undefined,
                //       probably need a typicalWithId or something
                "statementId": factory.make("typical statement").id
            }
        };
    }
};

factory.register("getStatement", getStatementRequests);
