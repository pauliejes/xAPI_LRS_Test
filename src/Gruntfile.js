var fs = require("fs"),
    path = require("path"),
    request = require("request"),
    lrsRes = require("./utils/lrsResources");

module.exports = function(grunt) {
    //
    // turn off strict because of how we are using the 'require' to
    // set a global that is picked up by the mocha 'src' files
    //
    /* jshint strict: false */
    //"use strict";
    var timeout = grunt.option("timeout") || 10000,
        slow = grunt.option("slow") || 1000;

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        /**
        *  Linting
        *  =======
        *
        *  Catch errors quickly with JS Hint
        */
        jshint: {
            all: [
                "Gruntfile.js",
                "**/*.js"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        mochaTest: {
            options: {
                reporter: "spec",
                clearRequireCache: true,
                timeout: timeout,
                slow: slow
            },
            "stage1-core": {
                options: {
                    require: function () {
                        /* global _featureSpec */
                        /* jshint -W020 */
                        _featureSpec = "features";
                        if (grunt.option("feature")) {
                            _featureSpec = grunt.option("feature");
                        }
                    }
                },
                src: ["stage1/core.js"]
            },
            "stage2-statementStructure": {
                src: ["stage2/statementStructure.js"]
            }
        },

        clean: ["var/statements/*.json"]
    });

    // Load Tasks
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-mocha-test");

    // Define tasks
    grunt.registerTask(
        "updateConsistent",
        "Updates the ./var/consistency.json file",
        function () {
            var done = this.async();
            request(
                {
                    url: lrsRes.endpoint + "statements?limit=1",
                    method: "GET",
                    headers: {
                        "X-Experience-API-Version": lrsRes.version,
                        "Authorization": lrsRes.authString
                    },
                },
                function (err, res) {
                    if (err) {
                        grunt.fail.warn(err);
                    }
                    fs.writeFile(
                        path.join(__dirname, "./var", "consistent.json"),
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

    grunt.registerTask("stage1", ["jshint", "mochaTest:stage1-core"]);
    grunt.registerTask("stage2", ["jshint", "updateConsistent", "mochaTest:stage2-statementStructure"]);

    grunt.registerTask("default", ["jshint", "mochaTest:stage1-core", "updateConsistent", "mochaTest:stage2-statementStructure"]);
};
