/* global _suiteCfg */
"use strict";
var request = require("request"),
    qs = require("querystring"),
    lrs = _suiteCfg.lrs,
    requestStatTotal = 0,
    requestStat = {},
    updateStat,
    buildUrl;

updateStat = function (cfg) {
    var statKey = cfg.request.method + " /" + cfg.request.resource;
    if (typeof requestStat[statKey] === "undefined") {
        requestStat[statKey] = 0;
    }
    requestStat[statKey] += 1;
    requestStatTotal += 1;
};

buildUrl = function (resource, params) {
    var prop;
    if (typeof params !== "undefined" && Object.keys(params).length > 0) {
        for (prop in params) {
            if (params.hasOwnProperty(prop) && typeof params[prop] === "object") {
                params[prop] = JSON.stringify(params[prop]);
            }
        }
        resource += "?" + qs.stringify(params);
    }
    return resource.indexOf("http") === 0 ? resource : lrs.endpoint + resource;
};

module.exports = {
    stat: function (logFunc) {
        logFunc("Request counts:");
        logFunc(JSON.stringify(requestStat, null, 4).slice(1, -1));
        logFunc("Total: ", requestStatTotal);
        logFunc("---------------");
    },

    makeRequest: function (cfg, callback) {
        updateStat(cfg);

        request(
            {
                url: buildUrl(cfg.request.resource, cfg.request.params),
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
            }
        );
    }
};
