/* global features, scenarios, steps, after */
"use strict";

var fs = require("fs"),
    Yadda = require("yadda"),
    libraries = require("../steps/consistent"),
    statementDir = __dirname + "/../var/statements",
    stat = require("../utils/request").stat,
    statementRe = /[-\w]+\.json$/,
    scenarioContext = {
        scenarioResource: {}
    },
    feature = {
        title: "Loadable statement matching",
        scenarios: []
    },
    runner;

Yadda.plugins.mocha.AsyncStepLevelPlugin.init();

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
                ]
            }
        );
    }
);

features(
    [ feature ],
    function (feature) {
        scenarios(
            feature.scenarios,
            function(scenario) {
                steps(
                    scenario.steps,
                    function(step, done) {
                        runner.yadda(step, scenarioContext, done);
                    }
                );
            }
        );
    }
);

after(function () {
    stat();
});
