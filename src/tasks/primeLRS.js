"use strict";

var async = require("async"),
    conflict = require("./primeLRS/conflict"),
    query = require("./primeLRS/query");

module.exports = function (grunt) {
    grunt.registerTask(
        "primeLRS",
        "Prime the LRS for various types of tests",
        function (arg1) {
            var done = this.async(),
                cfg = grunt.config("suite"),
                run = {
                    conflict: false,
                    query: false
                },
                funcs = [];

            if (typeof arg1 !== "undefined") {
                if (typeof run[arg1] === "undefined") {
                    grunt.fail.fatal("Unrecognized priming mode: '" + arg1 + "'");
                }

                run[arg1] = true;
            }
            else {
                run.conflict = run.query = true;
            }

            if (run.conflict) {
                funcs.push(
                    function (next) {
                        conflict(cfg, next);
                    }
                );
            }
            if (run.query) {
                funcs.push(
                    function (next) {
                        query(cfg, next);
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
