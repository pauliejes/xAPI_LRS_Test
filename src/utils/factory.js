"use strict";
var selectn = require("selectn"),
    cache = {};

module.exports = {
    register: function (source, object) {
        cache[source] = object;
    },
    make: function (fixturepath) {
        var fixture = selectn(fixturepath.split(" ").reverse().join("."), cache);
        if (typeof fixture === "function") {
            return fixture();
        }
        return JSON.parse(JSON.stringify(fixture));
    }
};
