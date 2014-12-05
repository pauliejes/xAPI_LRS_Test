"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

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
            "retrieveActivityProfileCluster",
            {
                typical: function () {
                    return {
                        primers: [
                            factory.make("typical saveActivityProfile")
                        ],
                        main: factory.make("typical retrieveActivityProfile")
                    };
                }
            }
        );
    }
};
