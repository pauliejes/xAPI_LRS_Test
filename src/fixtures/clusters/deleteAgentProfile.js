"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        fixtures.load(
            [
                "requests/saveAgentProfile",
                "requests/deleteAgentProfile",
                "requests/retrieveAgentProfile"
            ],
            cfg
        );

        factory.register(
            "deleteAgentProfileCluster",
            {
                typical: function () {
                    return {
                        primers: [
                            factory.make("typical saveAgentProfile")
                        ],
                        main: factory.make("typical deleteAgentProfile"),
                        verify: factory.make("typical retrieveAgentProfile")
                    };
                },
            }
        );
    }
};
