"use strict";
var factory = require("../../utils/factory"),
    lrsRes = require("../../utils/lrsResources"),
    aboutRequests
;

aboutRequests = {
    typical: {
        "resource": "about",
        "headers": {
            "X-Experience-API-Version": lrsRes.version,
            "Authorization": lrsRes.authString
        },
        "method": "GET"
    },
    minimal: {
        "resource": "about",
        "method": "GET"
    }
};

factory.register("about", aboutRequests);
