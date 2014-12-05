"use strict";
var fs = require("fs"),
    path = require("path"),
    async = require("async"),
    factory = require("../utils/factory"),
    fixtures = require("../fixtures/loader"),
    utilRequest = require("../utils/request");

module.exports = function (grunt) {
    grunt.registerTask(
        "retrieveConflictStatements",
        "Loads the LRS statements corresponding to the conflict IDs into scenario resource",
        function () {
            var done = this.async(),
                cfg = grunt.config("suite"),
                funcs = [];

            fixtures.load(
                [
                    "requests/fetchStatements"
                ],
                cfg
            );

            fs.readdir(
                cfg.persistence.conflicts,
                function (err, idDirs) {
                    if (err) {
                        done(new Error("Failed to read directory: " + err));
                        return;
                    }

                    idDirs.forEach(
                        function (dir) {
                            funcs.push(
                                function (next) {
                                    var conflictReq = {
                                        endpoint: cfg.lrs.endpoint,
                                        request: factory.make("getStatement fetchStatements")
                                    };
                                    conflictReq.request.params.statementId = dir;

                                    utilRequest.makeRequest(
                                        conflictReq,
                                        function (err, res) {
                                            if (err) {
                                                next(new Error("Request failed: " + err));
                                                return;
                                            }
                                            fs.writeFile(
                                                path.join(cfg.persistence.conflicts, dir, "retrieved.json"),
                                                JSON.stringify(JSON.parse(res.body), null, 4),
                                                function (err) {
                                                    if (err) {
                                                        next(new Error("Failed to write file: " + err));
                                                        return;
                                                    }
                                                    next();
                                                }
                                            );
                                        },
                                        {}
                                    );
                                }
                            );
                        }
                    );

                    async.series(
                        funcs,
                        function (err) {
                            if (err) {
                                done(new Error("Retrieve conflict setup failed: " + err));
                                return;
                            }

                            done();
                        }
                    );
                }
            );
        }
    );
};
