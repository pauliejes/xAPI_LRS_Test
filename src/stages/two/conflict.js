/* global after, features, _suiteCfg */
"use strict";

var fs = require("fs"),
    path = require("path"),
    Yadda = require("yadda"),
    libraries = [ require("../../steps/conflict"), require("../../steps/consistent") ],
    utilRequest = require("../../utils/request"),
    jsonFileRe = /^[-\w]+\.json$/,
    helpers = require("../helpers"),
    stageHelpers = require("./helpers"),
    featureList = [],
    runner;

Yadda.plugins.mocha.StepLevelPlugin.init();

runner = new Yadda.Yadda(libraries);

fs.readdirSync(_suiteCfg.persistence.conflicts).forEach(
    function (idDir) {
        var conflictDir = path.join(_suiteCfg.persistence.conflicts, idDir),
            feature = {
                title: "Conflicting Statement ID: " + idDir,
                scenarios: []
            };
        feature.scenarios.push(
            {
                title: "Control matches Retrieved for ID: " + idDir,
                steps: [
                    "Given the control structure for ID: " + idDir,
                    "When the control structure is loaded",
                    "Then the LRS structure was maintained"
                ],
                annotations: stageHelpers.isConsistent(require(path.join(conflictDir, "control.json")).stored) ? {} : { pending: true }
            }
        );
        fs.readdirSync(conflictDir).forEach(
            function (testCategoryDir) {
                if (jsonFileRe.exec(testCategoryDir)) {
                    return;
                }
                fs.readdirSync(path.join(conflictDir, testCategoryDir)).forEach(
                    function (testFile) {
                        var test = testFile.slice(0, testFile.indexOf(".json"));
                        if (! jsonFileRe.exec(testFile)) {
                            return;
                        }
                        feature.scenarios.push(
                            {
                                title: "Conflict on " + test + " in " + testCategoryDir,
                                steps: [
                                    "Given the conflicting property " + test + " in " + testCategoryDir,
                                    "When the conflicting structure is loaded",
                                    "Then the LRS was not updated"
                                ],
                                annotations: stageHelpers.isConsistent(require(path.join(conflictDir, "control.json")).stored) ? {} : { pending: true }
                            }
                        );
                    }
                );
            }
        );
        featureList.push(feature);
    }
);

features(
    featureList,
    function (feature) {
        helpers.runFeature(runner, feature, _suiteCfg, null, { conflictBaseDir: _suiteCfg.persistence.conflicts });
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
