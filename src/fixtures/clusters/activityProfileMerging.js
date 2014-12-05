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
            "activityProfileMergingCluster",
            {
                shallow: function () { return helper.merging.shallow("activityProfile"); },

                deep: function () { return helper.merging.deep("activityProfile"); },

                mergeJSONWithNotJSON: function () { return helper.merging.mergeJSONWithNotJSON("activityProfile"); },

                mergeNotJSONWithJSON: function () { return helper.merging.mergeNotJSONWithJSON("activityProfile"); },
            }
        );
    }
};
