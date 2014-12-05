"use strict";
var selectn = require("selectn"),
    cache = {};

module.exports = {
    register: function (source, object) {
        cache[source] = object;
    },
    make: function (fixturepath, fixturecfg) {
        var fixture = selectn(fixturepath.split(" ").reverse().join("."), cache);
        if (typeof fixture === "undefined") {
            throw new Error("Undefined fixture: " + fixturepath);
        }

        if (typeof fixture === "function") {
            return fixture(fixturecfg);
        }
        return JSON.parse(JSON.stringify(fixture));
    }
};
