/* global features, beforeEach, after, afterEach, _suiteCfg */
"use strict";

var taskName = "stage1:adhocValid",
    Yadda = require("yadda"),
    fs = require("fs"),
    helpers = require("../helpers")(taskName),
    fixtures = require("../../fixtures/loader"),
    libraries = [ require("../../steps/base"), require("../../steps/verify") ],
    runner = new Yadda.Yadda(libraries, {}),
    feature = {
        title: "Adhoc valid statement sending",
        scenarios: []
    },
    jsonFileRe = /^[-\w]+\.json$/;

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

//
// construct the adhoc scenarios
//
_suiteCfg.persistence.adhocValid.forEach(
    function (dir) {
        fs.readdirSync(dir).forEach(
            function (fname) {
                if (! jsonFileRe.exec(fname)) {
                    return;
                }

                feature.scenarios.push(
                    {
                        title: "Sending valid statement from file: " + fname,
                        steps: [
                            "Given a minimal saveStatement request",
                            "Given the statement is read from file " + dir + "/" + fname,
                            "When the request is made",
                            "Then the request is successful",
                        ]
                    }
                );
            }
        );
    }
);

//
// run the adhoc statements only if there are scenarios to run
//
if (feature.scenarios.length > 0) {
    features(
        [ feature ],
        function (feature) {
            helpers.runFeature(runner, feature, _suiteCfg);
        }
    );
}
