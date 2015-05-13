/* global features, scenarios, steps, beforeEach, after, afterEach, _suiteCfg */
"use strict";

var taskName = "stage2:statementStructure",
    Yadda = require("yadda"),
    fs = require("fs"),
    path = require("path"),
    helpers = require("../helpers")(taskName),
    stageHelpers = require("./helpers"),
    fixtures = require("../../fixtures/loader"),
    libraries = require("../../steps/consistent"),
    statementRe = /^[-\w]+\.json$/,
    feature = {
        title: "Loadable statement matching",
        scenarios: []
    },
    runner = new Yadda.Yadda(libraries);

fixtures.load(
    [
        "requests/fetchStatements",
    ],
    _suiteCfg
);

Yadda.plugins.mocha.StepLevelPlugin.init();
helpers.init();

beforeEach(helpers.beforeEach);
afterEach(helpers.afterEach);
after(helpers.after);

_suiteCfg.persistence.statementRead.forEach(
    function (dir) {
        fs.readdirSync(dir).forEach(
            function (fname) {
                var scenario,
                    isConsistent;

                if (! statementRe.exec(fname)) {
                    return;
                }

                isConsistent = stageHelpers.isConsistent(require(path.resolve(dir, fname)).stored);

                scenario = {
                    title: "Fetching statement matches locally stored statement: " + fname,
                    steps: [
                        "Given a loadable statement with filename: " + dir + "/" + fname,
                        "When the statement is retrieved",
                        "Then the statement structure matches",
                    ],
                    annotations: {}
                };
                if (! isConsistent) {
                    scenario.annotations.pending = true;
                    _suiteCfg._results[taskName].pendingConsistency += 1;
                }

                feature.scenarios.push(scenario);
            }
        );
    }
);

features(
    [ feature ],
    function (feature) {
        scenarios(
            feature.scenarios,
            function (scenario) {
                var scenarioResource = {
                    endpoint: _suiteCfg.lrs.endpoint
                };
                steps(
                    scenario.steps,
                    function (step, done) {
                        runner.yadda(
                            step,
                            {
                                scenarioResource: scenarioResource,
                            },
                            done
                        );
                    }
                );
            }
        );
    }
);
