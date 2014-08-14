"use strict";
var formats = require("./formats"),
    iso8601DateTime = new RegExp(formats.iso_date),
    contentTypeCheck,
    versionCheck,
    responses
;

contentTypeCheck = function (obj, type) {
    if (type !== "json") {
        return false;
    }
    return obj.response.headers["content-type"] === "application/json" ||
        obj.response.headers["content-type"].indexOf("application/json;") === 0;
};

versionCheck = function (obj) {
    return obj.response.headers["x-experience-api-version"] === "1.0.1" ||
           obj.response.headers["x-experience-api-version"] === "1.0.0";
};

responses = {
    about: function (obj) {
        //TODO:schema check
        return contentTypeCheck(obj, "json");
    },
    saveStatement: function (obj) {
        //TODO: schema check
        return contentTypeCheck(obj, "json");
    },
    getStatement: function (obj) {
        //TODO:schema check
        return contentTypeCheck(obj, "json") && iso8601DateTime.test(obj.response.headers["x-experience-api-consistent-through"]);
    },
    agentProfile: function () {
        //TODO:schema check
    }
};

module.exports = function (obj, type) {
    if (obj.response.status === 200) {
        return (responses[type](obj)) && versionCheck(obj, type);
    }
    else {
        return versionCheck(obj, type);
    }
};
