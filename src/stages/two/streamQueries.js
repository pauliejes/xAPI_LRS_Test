/* global features, beforeEach, after, afterEach, _suiteCfg */
"use strict";

/*
 * For this particular stage source file we are going to parse our
 * own feature file into a feature object that we can manipulate
 * ourselves on each control statement pass, calling the more
 * conventional Yadda function `featureFile` does effectively
 * the same thing but doesn't afford us the opportunity to
 * manipulate the feature title and annotations before calling the
 * underlying `describe` routine
 */
var taskName = "stage2:streamQueries",
    Yadda = require("yadda"),
    YaddaEnglish = require("yadda/lib/localisation/English"),
    YaddaFeatureFileParser = require("yadda/lib/parsers/FeatureFileParser"),
    fs = require("fs"),
    path = require("path"),
    stageHelpers = require("./helpers"),
    helpers = require("../helpers")(taskName),
    fixtures = require("../../fixtures/loader"),
    libraries = [ require("../../steps/queries.js"), require("../../steps/base") ],
    jsonFileRe = /^[-\w]+\.json$/,
    runner = new Yadda.Yadda(libraries, {}),
    parser = new YaddaFeatureFileParser(YaddaEnglish),
    feature = parser.parse("stages/two/streamQueries.feature"),
    origFeatureTitle = feature.title,
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
helpers.init();

beforeEach(helpers.beforeEach);
afterEach(helpers.afterEach);
after(helpers.after);

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
        if (! isConsistent) {
            _suiteCfg._results[taskName].pendingConsistency += 1;
            feature.annotations.pending = true;
        }

        feature.title = origFeatureTitle + " (query grouping: " + query.registration + ")";

        features(
            feature,
            function (feature) {
                helpers.runFeature(runner, feature, _suiteCfg, { hashes: hashes, markPending: markPending, taskName: taskName }, { queryMeta: query });

                delete feature.annotations.pending;
            }
        );
    }
);
