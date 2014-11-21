"use strict";

var async = require("async"),
    fs = require("fs"),
    path = require("path"),
    mkdirp = require("mkdirp"),
    moment = require("moment"),
    factory = require("../utils/factory"),
    utilRequest = require("../utils/request"),
    fixtures = require("../fixtures/loader");

function conflict (cfg, callback) {
    fixtures.load(["requests/saveStatement"], cfg);

    var controlReq = {
        endpoint: cfg.lrs.endpoint,
        request: factory.make("typical saveStatement")
    };

    utilRequest.makeRequest(
        controlReq,
        function (err, res) {
            var conflictDir;

            if (err) {
                callback(new Error("Request failed: " + err));
                return;
            }

            if (res.statusCode !== 204) {
                callback(new Error("Control statement failed to save: " + res.body + " (" + res.statusCode + ")"));
                return;
            }

            conflictDir = path.join(
                cfg.persistence.conflicts,
                controlReq.request.params.statementId
            );

            mkdirp(
                conflictDir,
                function (err) {
                    if (err) {
                        callback(new Error("Failed to create conflict directory: " + err));
                        return;
                    }

                    fs.writeFile(
                        path.join(conflictDir, "control.json"),
                        JSON.stringify(
                            {
                                structure: controlReq.request.content,
                                stored: moment()
                            },
                            null,
                            4
                        ),
                        function (err) {
                            if (err) {
                                callback(new Error("Failed to save conflict control file: " + err));
                                return;
                            }
                            callback();
                        }
                    );
                }
            );
        },
        {}
    );
}

module.exports = function (grunt) {
    grunt.registerTask(
        "primeLRS",
        "Prime the LRS for various types of tests",
        function (arg1) {
            var done = this.async(),
                cfg = grunt.config("suite"),
                run = {
                    conflict: false
                },
                funcs = [];

            if (typeof arg1 !== "undefined") {
                if (typeof run[arg1] === "undefined") {
                    grunt.fail.fatal("Unrecognized priming mode: '" + arg1 + "'");
                }

                run[arg1] = true;
            }
            else {
                run.conflict = true;
            }

            if (run.conflict) {
                funcs.push(
                    function (next) {
                        conflict(cfg, next);
                    }
                );
            }

            async.series(
                funcs,
                function (err) {
                    if (err) {
                        grunt.fail.fatal("Priming request failed: " + err);
                    }

                    done();
                }
            );
        }
    );
};
