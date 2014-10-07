"use strict";
var fs = require("fs"),
    path = require("path"),
    request = require("request");

module.exports = function (grunt) {
    grunt.registerTask(
        "updateConsistent",
        "Updates the .consistency.json file",
        function () {
            var done = this.async(),
                cfg = grunt.config("suite");

            request(
                {
                    url: cfg.lrs.endpoint + "statements?limit=1",
                    method: "GET",
                    headers: {
                        "X-Experience-API-Version": cfg.lrs.version,
                        "Authorization": cfg.lrs.authString
                    },
                },
                function (err, res) {
                    if (err) {
                        grunt.fail.warn(err);
                    }
                    fs.writeFile(
                        path.join(cfg.persistence.statementStore, ".consistent.json"),

                        JSON.stringify(res.headers["x-experience-api-consistent-through"]),

                        function (err) {
                            if (err) {
                                grunt.fail.warn(err);
                            }
                            done();
                        }
                    );
                }
            );
        }
    );
};
