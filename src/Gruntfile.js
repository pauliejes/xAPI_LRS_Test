var path = require("path"),
    mkdirp = require("mkdirp"),
    uuid = require("node-uuid"),
    colors = require("colors"),
    invalidPersistent = function (arr) {
        /* jshint strict: false */
        //"use strict";
        return typeof arr === "undefined" || arr.length <= 0;
    },
    resolvePaths = function (arr) {
        /* jshint strict: false */
        //"use strict";
        arr.forEach(
            function (dir, n) {
                arr[n] = path.resolve(dir);
            }
        );
    },
    commonMochaTestRequire = function () {
        /* global _suiteCfg */
        /* jshint strict: false */
        /* jshint -W020 */
        _suiteCfg = this;
    };

module.exports = function(grunt) {
    //
    // turn off strict because of how we are using the 'require' to
    // set a global that is picked up by the mocha 'src' files
    //
    /* jshint strict: false */

    var pkg = grunt.file.readJSON("package.json"),
        conformance = grunt.file.readJSON("conformance.json"),
        cfgFile = __dirname + "/config.json",
        templateFile,
        cfg,
        mochaTestOpts = {
            quiet: true,
            reporter: "progress",
            bail: false,
            timeout: 10000,
            slow: 1000
        },
        aliases,
        runId = uuid.v4(),
        captureExtension = "log";

    if (grunt.option("config")) {
        cfgFile = grunt.option("config");
        if (! /^\//.test(cfgFile)) {
            cfgFile = __dirname + "/" + cfgFile;
        }
    }

    if (! grunt.file.exists(cfgFile)) {
        if (grunt.option("endpoint")) {
            // config file doesn't exist yet, so create it from template with empty values
            templateFile = grunt.file.readJSON("./config.json.template");

            templateFile.lrs.endpoint = grunt.option("endpoint");
            templateFile.lrs.username = grunt.option("username");
            templateFile.lrs.password = grunt.option("password");
            templateFile.lrs.version = grunt.option("xapi-version");

            grunt.file.write(cfgFile, JSON.stringify(templateFile, null, 2));
        }
        else {
            grunt.fail.fatal("You must provide endpoint, username, password and xapi-version as parameters if you don't have a config.json file already.");
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
    cfg.developer = cfg.developer || grunt.option("developer") || false;

    if (cfg.developer) {
        runId = "development";
    }
    else {
        grunt.log.muted = true;
    }

    if (cfg.lrs.endpoint.slice(-1) !== "/") {
        cfg.lrs.endpoint += "/";
    }

    cfg._results = {
        "softwareVersion": pkg.version,
        "conformanceVersion": conformance.version,
        "initiatedAt": grunt.template.today("isoUtcDateTime"),
        "runId": runId,
        "lrs": {
            "endpoint": cfg.lrs.endpoint,
            "username": cfg.lrs.username,
            "version": cfg.lrs.version
        },
        "stage1:core": null,
        "stage1:adhocValid": null,
        "stage1:adhocInvalid": null,
        "stage1:conflict": null,
        "stage2:statementStructure": null,
        "stage2:conflict": null,
        "stage2:streamQueries": null
    };

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

    //
    // if we take this logic out of Gruntfile, will need to add a
    // path.relative(".", "../to/Gruntfile") then add the relevant path
    // to the end of that. This is because the config and gruntfile are in the
    // same location, and it makes more sense to let the user set the relative path
    // from there rather than a subdirectory
    //
    if (invalidPersistent(cfg.persistence.logs)) {
        cfg.persistence.logs = "./var/log";
    }
    mkdirp.sync(cfg.persistence.logs);
    cfg.persistence.logs = path.resolve(cfg.persistence.logs);
    cfg._logDir = cfg.persistence.logs + "/" + runId;
    mkdirp.sync(cfg._logDir);

    if (invalidPersistent(cfg.persistence.statementStore)) {
        cfg.persistence.statementStore = "./var/statements";
    }
    mkdirp.sync(cfg.persistence.statementStore);
    cfg.persistence.statementStore = path.resolve(cfg.persistence.statementStore);

    if (invalidPersistent(cfg.persistence.statementRead)) {
        cfg.persistence.statementRead = [ cfg.persistence.statementStore ];
    }
    resolvePaths(cfg.persistence.statementRead);
    if (cfg.persistence.statementRead.indexOf(cfg.persistence.statementStore) === -1) {
        cfg.persistence.statementRead.push(cfg.persistence.statementStore);
    }

    //
    // don't like how javascript handles undefined.forEach(...)
    // so instead of leaving the case where there are no adhoc statements as
    // adhoc(In)Valid is undefined and then checking whether its defined everytime
    // we try to use it, force it to be at least an empty array
    //
    if (invalidPersistent(cfg.persistence.adhocValid)) {
        cfg.persistence.adhocValid = [];
    }
    resolvePaths(cfg.persistence.adhocValid);
    if (invalidPersistent(cfg.persistence.adhocInvalid)) {
        cfg.persistence.adhocInvalid = [];
    }
    resolvePaths(cfg.persistence.adhocInvalid);

    if (invalidPersistent(cfg.persistence.conflicts)) {
        cfg.persistence.conflicts = "./var/conflicts";
    }
    mkdirp.sync(cfg.persistence.conflicts);
    cfg.persistence.conflicts = path.resolve(cfg.persistence.conflicts);

    if (invalidPersistent(cfg.persistence.queries)) {
        cfg.persistence.queries = "./var/queries";
    }
    mkdirp.sync(cfg.persistence.queries);
    cfg.persistence.queries = path.resolve(cfg.persistence.queries);

    [
        "quiet",
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

    cfg._runDetails = [
        colors.underline.yellow("xAPI LRS Test Suite\n"),
        "Software Version: " + cfg._results.softwareVersion,
        "Conformance Version: " + cfg._results.conformanceVersion,
        "Endpoint: " + cfg.lrs.endpoint,
        "Username: " + cfg.lrs.username,
        "xAPI Version: " + cfg.lrs.version,
        "Initiated at: " + cfg._results.initiatedAt,
        "Run ID: " + cfg._results.runId,
        "\n"
    ].join("\n");
    process.stdout.write(cfg._runDetails);

    if (mochaTestOpts.reporter === "json" || mochaTestOpts.reporter === "json-stream") {
        captureExtension = "json";
    }
    else if (mochaTestOpts.reporter === "doc") {
        captureExtension = "html";
    }
    else if (mochaTestOpts.reporter === "xunit") {
        captureExtension = "xml";
    }
    else if (mochaTestOpts.reporter === "markdown") {
        captureExtension = "md";
    }

    grunt.initConfig({
        pkg: pkg,

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
                        _suiteCfg.stage1._featureSpecFromCLI = _suiteCfg.stage1._featureSpecFromCLI || false;
                        _suiteCfg.stage1._grepFromCLI = _suiteCfg.stage1._grepFromCLI || false;
                        _suiteCfg.stage1.pending = _suiteCfg.stage1.pending || {};
                        _suiteCfg.stage1.stalePending = _suiteCfg.stage1.stalePending || false;

                        if (! _suiteCfg.stage1.stalePending && grunt.option("diagnostics")) {
                            _suiteCfg.stage1.stalePending = true;
                        }

                        if (grunt.option("feature") || grunt.option("features")) {
                            _suiteCfg.stage1._featureSpecFromCLI = true;
                            _suiteCfg.stage1.featureSpec = grunt.option("feature") || grunt.option("features");
                        }
                        if (grunt.option("grep")) {
                            _suiteCfg.stage1._grepFromCLI = grunt.option("grep");
                        }
                    },
                    captureFile: cfg._logDir + "/stage1-core." + captureExtension
                },
                src: ["stages/one/core.js"]
            },
            "stage1-conflict": {
                options: {
                    require: commonMochaTestRequire.bind(cfg),
                    captureFile: cfg._logDir + "/stage1-conflict." + captureExtension
                },
                src: ["stages/one/conflict/conflict.js"]
            },
            "stage1-adhocValid": {
                options: {
                    require: commonMochaTestRequire.bind(cfg),
                    captureFile: cfg._logDir + "/stage1-adhocValid." + captureExtension
                },
                src: ["stages/one/adhocValid.js"]
            },
            "stage1-adhocInvalid": {
                options: {
                    require: commonMochaTestRequire.bind(cfg),
                    captureFile: cfg._logDir + "/stage1-adhocInvalid." + captureExtension
                },
                src: ["stages/one/adhocInvalid.js"]
            },
            "stage2-statementStructure": {
                options: {
                    require: commonMochaTestRequire.bind(cfg),
                    captureFile: cfg._logDir + "/stage2-statementStructure." + captureExtension
                },
                src: ["stages/two/statementStructure.js"]
            },
            "stage2-conflict": {
                options: {
                    require: commonMochaTestRequire.bind(cfg),
                    captureFile: cfg._logDir + "/stage2-conflict." + captureExtension
                },
                src: ["stages/two/conflict.js"]
            },
            "stage2-streamQueries": {
                options: {
                    require: function () {
                        /* global _suiteCfg */
                        /* jshint -W020 */
                        _suiteCfg = cfg;

                        _suiteCfg.stage2 = _suiteCfg.stage2 || {};
                        _suiteCfg.stage2.queries = _suiteCfg.stage2.queries || {};
                        _suiteCfg.stage2.queries.pending = _suiteCfg.stage2.queries.pending || {};
                    },
                    captureFile: cfg._logDir + "/stage2-streamQueries." + captureExtension
                },
                src: ["stages/two/streamQueries.js"]
            }
        },

        clean: [
            cfg.persistence.logs,
            cfg.persistence.statementStore,
            cfg.persistence.conflicts,
            cfg.persistence.queries,
            "var"
        ],

        suite: cfg
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-mocha-test");
    grunt.loadNpmTasks("grunt-continue");
    grunt.loadTasks("tasks");

    aliases = {
        adhoc: [
            "continue:on",
            "mochaTest:stage1-adhocValid",
            "mochaTest:stage1-adhocInvalid",
            "continue:off"
        ],
        conflict: [
            "primeLRS:conflict",
            "continue:on",
            "mochaTest:stage1-conflict",
            "continue:off",
            "updateConsistent",
            "retrieveConflictStatements",
            "continue:on",
            "mochaTest:stage2-conflict",
            "continue:off"
        ],
        query: [
            "primeLRS:query",
            "updateConsistent",
            "continue:on",
            "mochaTest:stage2-streamQueries",
            "continue:off"
        ],
        stage1: [
            "continue:on",
            "mochaTest:stage1-core",
            "mochaTest:stage1-adhocValid",
            "mochaTest:stage1-adhocInvalid",
            "continue:off",
            "primeLRS",
            "continue:on",
            "mochaTest:stage1-conflict",
            "continue:off"
        ],
        stage2: [
            "updateConsistent",
            "continue:on",
            "mochaTest:stage2-statementStructure",
            "continue:off",
            "retrieveConflictStatements",
            "continue:on",
            "mochaTest:stage2-conflict",
            "mochaTest:stage2-streamQueries",
            "continue:off"
        ],
        "default": [
            "continue:on",
            "mochaTest:stage1-core",
            "mochaTest:stage1-adhocValid",
            "mochaTest:stage1-adhocInvalid",
            "continue:off",
            "primeLRS",
            "continue:on",
            "mochaTest:stage1-conflict",
            "continue:off",
            "updateConsistent",
            "continue:on",
            "mochaTest:stage2-statementStructure",
            "continue:off",
            "retrieveConflictStatements",
            "continue:on",
            "mochaTest:stage2-conflict",
            "mochaTest:stage2-streamQueries",
            "continue:off"
        ]
    };

    //
    // add a set of aliases that maps to the mochaTest subtasks to
    // allow easy running of the subtask + summary
    //
    Object.keys(grunt.config.get("mochaTest")).forEach(
        function (k) {
            if (k === "options") {
                return;
            }
            aliases[k] = [ "continue:on", "mochaTest:" + k, "continue:off" ];
        }
    );

    Object.keys(aliases).forEach(
        function (k) {
            if (cfg.developer) {
                aliases[k].unshift("jshint");
            }
            aliases[k].push("summary");
            grunt.registerTask(k, aliases[k]);
        }
    );
};
