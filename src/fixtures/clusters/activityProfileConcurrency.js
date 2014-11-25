"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader"),
    helper = require("./helpers");

module.exports = {
    init: function (cfg) {
        fixtures.load(
            [
                "requests/saveActivityProfile",
                "requests/retrieveActivityProfile"
            ],
            cfg
        );

        factory.register(
            "activityProfileConcurrencyCluster",
            {
                noneMatch: function () { return helper.concurrency.noneMatch("activityProfile"); },

                incorrectNoneMatch: function () { return helper.concurrency.incorrectNoneMatch("activityProfile"); },

                correctMatch: function () { return helper.concurrency.correctMatch("activityProfile"); },

                correctMatchUpperCaseEtag: function () { return helper.concurrency.correctMatchUpperCaseEtag("activityProfile"); },

                incorrectMatch: function () { return helper.concurrency.incorrectMatch("activityProfile"); },

                ifMatchAndIfNoneMatch: function () { return helper.concurrency.ifMatchAndIfNoneMatch("activityProfile"); },

                noMatchHeaders: function () { return helper.concurrency.noMatchHeaders("activityProfile"); }
            }
        );
    }
};
