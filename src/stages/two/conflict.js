/* global beforeEach, after, afterEach, features, _suiteCfg */
"use strict";

var taskName = "stage2:conflict",
    Yadda = require("yadda"),
    fs = require("fs"),
    path = require("path"),
    helpers = require("../helpers")(taskName),
    libraries = [ require("../../steps/conflict"), require("../../steps/consistent") ],
    stageHelpers = require("./helpers"),
    jsonFileRe = /^[-\w]+\.json$/,
    featureList = [],
    runner = new Yadda.Yadda(libraries);

Yadda.plugins.mocha.StepLevelPlugin.init();
helpers.init();

beforeEach(helpers.beforeEach);
afterEach(helpers.afterEach);
after(helpers.after);

fs.readdirSync(_suiteCfg.persistence.conflicts).forEach(
    function (idDir) {
        var conflictDir = path.join(_suiteCfg.persistence.conflicts, idDir),
            feature = {
                title: "Conflicting Statement ID: " + idDir,
                scenarios: []
            },
            isConsistent = stageHelpers.isConsistent(require(path.join(conflictDir, "control.json")).stored);

        feature.scenarios.push(
            {
                title: "Control matches Retrieved for ID: " + idDir,
                steps: [
                    "Given the control structure for ID: " + idDir,
                    "When the control structure is loaded",
                    "Then the LRS structure was maintained"
                ],
                annotations: isConsistent ? {} : { pending: true }
            }
        );
        if (! isConsistent) {
            _suiteCfg._results[taskName].pendingConsistency += 1;
        }

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
                                annotations: isConsistent ? {} : { pending: true }
                            }
                        );
                        if (! isConsistent) {
                            _suiteCfg._results[taskName].pendingConsistency += 1;
                        }
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
