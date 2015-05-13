/* global scenarios, steps, _suiteCfg */
"use strict";

var crypto = require("crypto"),
    utilRequest = require("../utils/request");

module.exports = function (taskName) {
    return {
        runFeature: function (runner, feature, suiteCfg, cfg, featureCtx) {
            var featureResource = {};

            cfg = cfg || { hashes: {}, markPending: {} };
            if (typeof featureCtx !== "undefined") {
                Object.keys(featureCtx).forEach(
                    function (prop) {
                        /* do not overwrite */
                        if (! featureResource.hasOwnProperty(prop)) {
                            featureResource[prop] = featureCtx[prop];
                        }
                    }
                );
            }

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
                        _suiteCfg._results[cfg.taskName].pendingLocally += 1;
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

                            //
                            // failed assertions result in an exception which prevents the callback
                            // from being executed, so catch them to still do our cleanup to prevent
                            // false negatives in the test suite (though smaller risk of false positives)
                            // then re-throw to see the test failure
                            //
                            try {
                                runner.yadda(
                                    step,
                                    context,
                                    function (err, info) {
                                        if (this.scenarioResource.cleanUpRequests.length > 0 && (this.isLast || err !== null)) {
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
                            catch (ex) {
                                if (context.scenarioResource.cleanUpRequests.length > 0) {
                                    utilRequest.makeRequestSeries(
                                        context.scenarioResource.cleanUpRequests,
                                        function () {
                                            throw ex;
                                        }
                                    );
                                    return;
                                }
                                throw ex;
                            }
                        }
                    );
                }
            );
        },

        init: function () {
            _suiteCfg._results[taskName] = {
                passed: null,
                failed: null,
                pendingConsistency: null,
                pendingLocally: null
            };
        },

        beforeEach: function () {
            this.scenarioResult = "passed";
        },

        afterEach: function () {
            if (this.currentTest.state === "failed") {
                this.scenarioResult = "failed";
            }
            if (this.currentTest.title === this.currentTest.parent.tests[this.currentTest.parent.tests.length - 1].title) {
                _suiteCfg._results[taskName][this.scenarioResult] += 1;
            }
        },

        after: function () {
            if (_suiteCfg.diagnostics.requestCount) {
                utilRequest.stat(_suiteCfg._logger);
                utilRequest.statReset();
            }
        }
    };
};
