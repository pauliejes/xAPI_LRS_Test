/* global featureFile, beforeEach, after, afterEach, _suiteCfg */
"use strict";

var taskName = "stage1:conflict",
    Yadda = require("yadda"),
    fs = require("fs"),
    path = require("path"),
    helpers = require("../../helpers")(taskName),
    fixtures = require("../../../fixtures/loader"),
    libraries = [ require("../../../steps/base"), require("../../../steps/conflict") ],
    runner = new Yadda.Yadda(libraries, {});

fixtures.load(
    [
        "requests/saveStatement"
    ],
    _suiteCfg
);

Yadda.plugins.mocha.StepLevelPlugin.init();
helpers.init();

beforeEach(helpers.beforeEach);
afterEach(helpers.afterEach);
after(helpers.after);

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
