"use strict";
var factory = require("../../utils/factory"),
    lrsRes = require("../../utils/lrsResources"),
    saveStatementRequests
;

require("../properties/statement"),

saveStatementRequests = {
    minimal: {
        "resource": "statements",
        "headers": {
            "X-Experience-API-Version": lrsRes.version,
            "Authorization": lrsRes.authString,
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
                "X-Experience-API-Version": lrsRes.version,
                "Authorization": lrsRes.authString,
                "Content-Type": "application/json"
            },
            "method": "PUT",
            "params": {
                "statementId": obj.id
            },
            "content": obj
        };
    }
};

factory.register("saveStatement", saveStatementRequests);
