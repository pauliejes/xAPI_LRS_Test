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
            "agentProfileMergingCluster",
            {
                shallow: function () { return helper.merging.shallow("agentProfile"); },

                deep: function () { return helper.merging.deep("agentProfile"); },

                mergeJSONWithNotJSON: function () { return helper.merging.mergeJSONWithNotJSON("agentProfile"); },

                mergeNotJSONWithJSON: function () { return helper.merging.mergeNotJSONWithJSON("agentProfile"); },
            }
        );
    }
};
