/* global featureFile, after, _suiteCfg */
"use strict";

var Yadda = require("yadda"),
    fs = require("fs"),
    path = require("path"),
    helpers = require("../../helpers"),
    fixtures = require("../../../fixtures/loader"),
    utilRequest = require("../../../utils/request"),
    libraries = [ require("../../../steps/base"), require("../../../steps/conflict") ],
    runner = new Yadda.Yadda(libraries, {});

fixtures.load(
    [
        "requests/saveStatement"
    ],
    _suiteCfg
);

Yadda.plugins.mocha.StepLevelPlugin.init();

fs.readdirSync(_suiteCfg.persistence.conflicts).forEach(
    function (dir) {
        var controlDir = path.join(_suiteCfg.persistence.conflicts, dir);

        new Yadda.FeatureFileSearch("stages/one/conflict/features").each(
            function (file) {
                featureFile(
                    file,
                    function (feature) {
                        helpers.runFeature(runner, feature, _suiteCfg, null, { conflictDir: controlDir } );
                    }
                );
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
