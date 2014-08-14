"use strict";
var factory = require("../../utils/factory"),
    lrsRes = require("../../utils/lrsResources"),
    getMoreStatementsRequests
;

require("../properties/statement");

getMoreStatementsRequests = {
    typical: function () {
        return {
            "resource": "place holder url",
            "headers": {
                "X-Experience-API-Version": lrsRes.version,
                "Authorization": lrsRes.authString
            },
            "method": "GET",
        };
    }
};

factory.register("getMoreStatements", getMoreStatementsRequests);
