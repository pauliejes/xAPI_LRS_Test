"use strict";
var lrsCfg = require("../config.json"),
    request = require("request"),
    qs = require("querystring"),
    isApplicationJSON,
    requestStatTotal = 0,
    requestStat = {},
    updateStat,
    splitUrl,
    statKey,
    reqKey
;

isApplicationJSON = function (headers) {
    return headers.hasOwnProperty("Content-Type") && headers["Content-Type"] === "application/json";
};

updateStat = function (cfg) {
    statKey = reqKey(cfg);
    if (typeof requestStat[statKey] === "undefined") {
        requestStat[statKey] = 0;
    }
    requestStat[statKey] += 1;
    requestStatTotal += 1;
};

splitUrl = function (resource, params) {
    var prop;
    if (typeof params !== "undefined" && Object.keys(params).length > 0) {
        for (prop in params) {
            if (params.hasOwnProperty(prop) && typeof params[prop] === "object") {
                params[prop] = JSON.stringify(params[prop]);
            }
        }
        resource += "?" + qs.stringify(params);
    }
    return resource.indexOf("http") === 0 ? resource : lrsCfg.endpoint + resource;
};

reqKey = function (cfg) {
    return cfg.request.method + " /" + cfg.request.resource;
};

module.exports = {
    stat: function () {
        console.log("Request counts:");
        console.log(JSON.stringify(requestStat, null, 4).slice(1, -1));
        console.log("Total: ", requestStatTotal);
        console.log("---------------");
    },
    makeRequest: function (cfg, callback) {
        updateStat(cfg);
        request({
            url: splitUrl(cfg.request.resource, cfg.request.params),
            method: cfg.request.method,
            headers: cfg.request.headers,
            //TODO: body must be a string or buffer.  Use content-type header and typeof content to decide conversion.
            body: typeof cfg.request.content === "object" ? JSON.stringify(cfg.request.content) : cfg.request.content,
        },
        function (err, res) {
            cfg.response = res;
            if (typeof callback !== "undefined" && typeof callback === "function") {
                callback(err, res);
            }
        });
    }
};
