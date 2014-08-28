/* global features, scenarios, steps, after, _suiteCfg */
"use strict";

var fs = require("fs"),
    Yadda = require("yadda"),
    libraries = require("../steps/consistent"),
    stat = require("../utils/request").stat,
    statementDir = __dirname + "/../var/statements",
    statementRe = /[-\w]+\.json$/,
    consistentThrough = new Date(require("../var/consistent.json")),
    isConsistent = function (fname) {
        return new Date(require(statementDir + "/" + fname).stored) > consistentThrough;
    },
    scenarioContext = {
        scenarioResource: {}
    },
    feature = {
        title: "Loadable statement matching",
        scenarios: []
    },
    runner;

Yadda.plugins.mocha.StepLevelPlugin.init();

runner = new Yadda.Yadda(libraries);

fs.readdirSync(statementDir).forEach(
    function (fname) {
        if (! statementRe.exec(fname)) {
            return;
        }
        feature.scenarios.push(
            {
                title: "Fetching statement matches locally stored statement: " + fname,
                steps: [
                    "Given a loadable statement with filename: " + fname,
                    "When the statement is retrieved",
                    "Then the statement structure matches",
                ],
                annotations: isConsistent(fname) ? { pending: true } : {}
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
                steps(
                    scenario.steps,
                    function (step, done) {
                        runner.yadda(step, scenarioContext, done);
                    }
                );
            }
        );
    }
);

after(
    function () {
        if (_suiteCfg.diagnostics.requestCount) {
            stat(_suiteCfg._logger);
        }
    }
);
