/* global featureFile, after, _suiteCfg */
"use strict";

var Yadda = require("yadda"),
    fs = require("fs"),
    path = require("path"),
    stageHelpers = require("./helpers"),
    helpers = require("../helpers"),
    fixtures = require("../../fixtures/loader"),
    utilRequest = require("../../utils/request"),
    libraries = [ require("../../steps/queries.js"), require("../../steps/base") ],
    jsonFileRe = /^[-\w]+\.json$/,
    runner = new Yadda.Yadda(libraries, {}),
    hashes = {},
    markPending = {};

fixtures.load(
    [
        "requests/fetchStatements",
        "properties/agent"
    ],
    _suiteCfg
);

Yadda.plugins.mocha.StepLevelPlugin.init();

Object.keys(_suiteCfg.stage2.queries.pending).forEach(
    function (key) {
        _suiteCfg.stage2.queries.pending[key].forEach(
            function (id) {
                markPending[id] = key;
            }
        );
    }
);

fs.readdirSync(_suiteCfg.persistence.queries).forEach(
    function (fname) {
        var query,
            isConsistent;

        if (! jsonFileRe.exec(fname)) {
            return;
        }

        query = require(path.resolve(_suiteCfg.persistence.queries, fname));
        isConsistent = stageHelpers.isConsistent(query.end);

        featureFile(
            "stages/two/streamQueries.feature",
            function (feature) {
                feature.title += " (query grouping: " + query.registration + ")";
                if (! isConsistent) {
                    feature.annotations.pending = true;
                }
                helpers.runFeature(runner, feature, _suiteCfg, { hashes: hashes, markPending: markPending }, { queryMeta: query });
            }
        );
    }
);

after(
    function () {
        if (_suiteCfg.diagnostics.requestCount) {
            utilRequest.stat(_suiteCfg._logger);
            utilRequest.statReset();
        }
    }
);
