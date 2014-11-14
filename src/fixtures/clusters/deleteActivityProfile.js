"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        fixtures.load(
            [
                "requests/saveActivityProfile",
                "requests/deleteActivityProfile",
                "requests/retrieveActivityProfile"
            ],
            cfg
        );

        factory.register(
            "deleteActivityProfileCluster",
            {
                typical: function () {
                    return {
                        primers: [
                            factory.make("typical saveActivityProfile")
                        ],
                        main: factory.make("typical deleteActivityProfile"),
                        verify: factory.make("typical retrieveActivityProfile")
                    };
                },
            }
        );
    }
};
