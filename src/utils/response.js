"use strict";
var formats = require("./formats"),
    iso8601DateTime = new RegExp(formats.iso_date),
    contentTypeCheck,
    versionCheck,
    responses
;

contentTypeCheck = function (res, type) {
    if (type !== "json") {
        return false;
    }
    return res.headers["content-type"] === "application/json" ||
        res.headers["content-type"].indexOf("application/json;") === 0;
};

versionCheck = function (res) {
    return res.headers["x-experience-api-version"] === "1.0.1" ||
           res.headers["x-experience-api-version"] === "1.0.0";
};

responses = {
    about: function (res) {
        //TODO:schema check
        return contentTypeCheck(res, "json");
    },
    saveStatement: function (res) {
        return contentTypeCheck(res, "json");
    },
    getStatement: function (res) {
        return contentTypeCheck(res, "json") && iso8601DateTime.test(res.headers["x-experience-api-consistent-through"]);
    }
};

module.exports = function (res, type) {
    if (res.statusCode === 200) {
        return (responses[type](res)) && versionCheck(res, type);
    }
    else {
        return versionCheck(res, type);
    }
};
