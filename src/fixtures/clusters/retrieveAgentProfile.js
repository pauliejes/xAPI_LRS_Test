"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

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
            "retrieveAgentProfileCluster",
            {
                typical: function () {
                    return {
                        primers: [
                            factory.make("typical saveAgentProfile")
                        ],
                        main: factory.make("typical retrieveAgentProfile")
                    };
                }
            }
        );
    }
};
