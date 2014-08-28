var fs = require("fs"),
    path = require("path"),
    request = require("request");

module.exports = function(grunt) {
    //
    // turn off strict because of how we are using the 'require' to
    // set a global that is picked up by the mocha 'src' files
    //
    /* jshint strict: false */
    //"use strict";

    var cfgFile = __dirname + "/config.json",
        cfg,
        mochaTestOpts = {
            reporter: "spec",
            bail: false,
            timeout: 10000,
            slow: 1000
        };

    if (grunt.option("config")) {
        cfgFile = grunt.option("config");
        if (! /^\//.test(cfgFile)) {
            cfgFile = __dirname + "/" + cfgFile;
        }
    }

    try {
        cfg = require("./utils/config")(cfgFile);
    }
    catch (ex) {
        grunt.fail.fatal(ex);
    }

    cfg._logger = console.log;
    cfg.diagnostics = cfg.diagnostics || {};

    //
    // provide a quick flag to turn them all on
    //
    if (grunt.option("diagnostics")) {
        cfg.diagnostics.requestCount = true;
        cfg.diagnostics.stepHash = true;
    }

    //
    // also provide flags for commonly used settings that should be
    // easy to toggle
    //
    if (grunt.option("count")) {
        cfg.diagnostics.requestCount = true;
    }
    if (grunt.option("hash")) {
        cfg.diagnostics.stepHash = true;
    }

    if (cfg.lrs.endpoint.slice(-1) !== "/") {
        cfg.lrs.endpoint += "/";
    }

    [
        "reporter",
        "bail",
        "timeout",
        "slow",
        "grep"
    ].forEach(
        function (key) {
            if (typeof grunt.option(key) !== "undefined") {
                mochaTestOpts[key] = grunt.option(key);
            }
            else if (typeof cfg[key] !== "undefined") {
                mochaTestOpts[key] = cfg[key];
            }
        }
    );

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

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
            options: mochaTestOpts,
            "stage1-core": {
                options: {
                    require: function () {
                        /* global _suiteCfg */
                        /* jshint -W020 */
                        _suiteCfg = cfg;

                        _suiteCfg.stage1 = _suiteCfg.stage1 || {};
                        _suiteCfg.stage1.featureSpec = _suiteCfg.stage1.featureSpec || "features";
                        _suiteCfg.stage1.pending = _suiteCfg.stage1.pending || {};

                        if (grunt.option("feature") || grunt.option("features")) {
                            _suiteCfg.stage1.featureSpec = grunt.option("feature") || grunt.option("features");
                        }
                    }
                },
                src: ["stage1/core.js"]
            },
            "stage2-statementStructure": {
                options: {
                    require: function () {
                        /* global _suiteCfg */
                        /* jshint -W020 */
                        _suiteCfg = cfg;
                    }
                },
                src: ["stage2/statementStructure.js"]
            }
        },

        clean: [
            "var/statements/*.json",
            "var/consistent.json"
        ]
    });

    // Load Tasks
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-mocha-test");

    // Define tasks
    grunt.registerTask(
        "clearSandbox",
        "Cleans up statements sent to a sandbox during testing",
        function () {
            var done;

            if (cfg.lrs.endpoint.indexOf("sandbox") === -1) {
                grunt.fail.warn("Not a sandbox");
            }

            done = this.async();

            request(
                {
                    url: cfg.lrs.endpoint + "extended?action=clear_sandbox",
                    method: "GET",
                    headers: {
                        "X-Experience-API-Version": cfg.lrs.version,
                        "Authorization": cfg.lrs.authString
                    }
                },
                function (err) {
                    if (err) {
                        grunt.fail.warn(err);
                    }
                    done(err);
                }
            );
        }
    );

    grunt.registerTask(
        "updateConsistent",
        "Updates the ./var/consistency.json file",
        function () {
            var done = this.async();
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
