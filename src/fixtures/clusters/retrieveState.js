"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        fixtures.load(
            [
                "requests/saveState",
                "requests/retrieveState",
                "properties/UUID"
            ],
            cfg
        );

        factory.register(
            "retrieveStateCluster",
            {
                typical: function () {
                    return {
                        primers: [
                            factory.make("typical saveState")
                        ],
                        main: factory.make("typical retrieveState")
                    };
                },
                withRegistration: function () {
                    var uuid = factory.make("good UUID"),
                        obj = {
                            primers: [
                                factory.make("typical saveState")
                            ],
                            main: factory.make("typical retrieveState")
                        };

                    obj.primers[0].params.registration = uuid;
                    obj.main.params.registration = uuid;

                    return obj;
                }
            }
        );
    }
};
