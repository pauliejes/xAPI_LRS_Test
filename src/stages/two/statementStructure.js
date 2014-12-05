/* global features, scenarios, steps, after, _suiteCfg */
"use strict";

var fs = require("fs"),
    path = require("path"),
    Yadda = require("yadda"),
    stageHelpers = require("./helpers"),
    fixtures = require("../../fixtures/loader"),
    libraries = require("../../steps/consistent"),
    utilRequest = require("../../utils/request"),
    statementRe = /^[-\w]+\.json$/,
    feature = {
        title: "Loadable statement matching",
        scenarios: []
    },
    runner;

fixtures.load(
    [
        "requests/fetchStatements",
    ],
    _suiteCfg
);

Yadda.plugins.mocha.StepLevelPlugin.init();

runner = new Yadda.Yadda(libraries);

_suiteCfg.persistence.statementRead.forEach(
    function (dir) {
        fs.readdirSync(dir).forEach(
            function (fname) {
                if (! statementRe.exec(fname)) {
                    return;
                }
                feature.scenarios.push(
                    {
                        title: "Fetching statement matches locally stored statement: " + fname,
                        steps: [
                            "Given a loadable statement with filename: " + dir + "/" + fname,
                            "When the statement is retrieved",
                            "Then the statement structure matches",
                        ],
                        annotations: stageHelpers.isConsistent(
                            require(path.resolve(dir, fname)).stored
                        ) ? {} : { pending: true }
                    }
                );
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

after(
    function () {
        if (_suiteCfg.diagnostics.requestCount) {
            utilRequest.stat(_suiteCfg._logger);
            utilRequest.statReset();
        }
    }
);
