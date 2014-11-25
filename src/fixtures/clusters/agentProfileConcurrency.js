"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader"),
    helper = require("./helpers");

module.exports = {
    init: function (cfg) {
        fixtures.load(
            [
                "requests/saveAgentProfile",
                "requests/retrieveAgentProfile"
            ],
            cfg
        );

        factory.register(
            "agentProfileConcurrencyCluster",
            {
                noneMatch: function () { return helper.concurrency.noneMatch("agentProfile"); },

                incorrectNoneMatch: function () { return helper.concurrency.incorrectNoneMatch("agentProfile"); },

                correctMatch: function () { return helper.concurrency.correctMatch("agentProfile"); },

                correctMatchUpperCaseEtag: function () { return helper.concurrency.correctMatchUpperCaseEtag("agentProfile"); },

                incorrectMatch: function () { return helper.concurrency.incorrectMatch("agentProfile"); },

                ifMatchAndIfNoneMatch: function () { return helper.concurrency.ifMatchAndIfNoneMatch("agentProfile"); },

                noMatchHeaders: function () { return helper.concurrency.noMatchHeaders("agentProfile"); }
            }
        );
    }
};
