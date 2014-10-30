/* global features, after, _suiteCfg */
"use strict";

var Yadda = require("yadda"),
    fs = require("fs"),
    utilRequest = require("../utils/request"),
    helpers = require("./helpers"),
    fixtures = require("../fixtures/loader"),
    libraries = [ require("../steps/base"), require("../steps/verify") ],
    runner = new Yadda.Yadda(libraries, {}),
    feature = {
        title: "Adhoc invalid statement sending",
        scenarios: []
    };

fixtures.load(
    [
        "requests/saveStatement"
    ],
    _suiteCfg
);

Yadda.plugins.mocha.StepLevelPlugin.init();

//
// construct the adhoc scenarios
//
_suiteCfg.persistence.adhocInvalid.forEach(
    function (dir) {
        fs.readdirSync(dir).forEach(
            function (fname) {
                feature.scenarios.push(
                    {
                        title: "Sending invalid statement from file: " + fname,
                        steps: [
                            "Given a minimal saveStatement request",
                            "Given the statement is read from file " + dir + "/" + fname,
                            "When the request is made",
                            "Then the LRS responds with HTTP 400",
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
            helpers.runFeature(runner, feature);
        }
    );
}

after(
    function () {
        if (_suiteCfg.diagnostics.requestCount) {
            utilRequest.stat(_suiteCfg._logger);
            utilRequest.statReset();
        }
    }
);
