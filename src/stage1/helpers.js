/* global scenarios, steps */
"use strict";

var crypto = require("crypto"),
    utilRequest = require("../utils/request");

module.exports = {
    runFeature: function (runner, feature, suiteCfg, cfg) {
        var featureResource = {};

        cfg = cfg || { hashes: {}, markPending: {} };

        feature.scenarios.forEach(
            function (scenario) {
                var hashable = [];
                scenario.steps.forEach(
                    function (step) {
                        if (/^Given (?:log|inspect)/i.test(step)) {
                            return;
                        }

                        hashable.push(step);
                        scenario.lastStep = step;
                    }
                );

                scenario.stepHash = crypto.createHash("md5").update(JSON.stringify(hashable), "utf8").digest("hex");
                cfg.hashes[scenario.stepHash] = false;

                if (suiteCfg.diagnostics.stepHash) {
                    scenario.title += " (" + scenario.stepHash + ")";
                }

                if (cfg.markPending[scenario.stepHash]) {
                    scenario.title = "PENDING (" + cfg.markPending[scenario.stepHash] + "): " + scenario.title;
                    scenario.annotations.pending = true;
                }
            }
        );

        scenarios(
            feature.scenarios,
            function (scenario) {
                var scenarioResource = {
                        endpoint: suiteCfg.lrs.endpoint,
                        cleanUpRequests: []
                    },
                    trace = [];

                steps(
                    scenario.steps,
                    function (step, done) {
                        var context = {
                            featureResource: featureResource,
                            scenarioResource: scenarioResource,
                            trace: trace,
                            hash: scenario.stepHash,
                            isLast: (step === scenario.lastStep),
                            statementStore: suiteCfg.persistence.statementStore,
                            logger: suiteCfg._logger
                        };

                        trace.push(step);

                        runner.yadda(
                            step,
                            context,
                            function (err, info) {
                                if (this.isLast && this.scenarioResource.cleanUpRequests.length > 0) {
                                    utilRequest.makeRequestSeries(
                                        this.scenarioResource.cleanUpRequests,
                                        function () {
                                            done(err, info);
                                        }
                                    );
                                    return;
                                }

                                done(err, info);
                            }.bind(context)
                        );
                    }
                );
            }
        );
    }
};
