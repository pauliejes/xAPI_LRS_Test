"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        fixtures.load(
            [
                "requests/saveActivityProfile",
                "requests/retrieveActivityProfileIds"
            ],
            cfg
        );

        factory.register(
            "retrieveActivityProfileIdsCluster",
            {
                typical: function () {
                    var obj = {
                        primers: {
                            order: "parallel",
                            list: [
                                factory.make("typical saveActivityProfile"),
                                factory.make("typical saveActivityProfile"),
                                factory.make("typical saveActivityProfile")
                            ]
                        },
                        main: factory.make("typical retrieveActivityProfileIds")
                    };

                    obj.primers.list[0].params.profileId += "/zero";
                    obj.primers.list[1].params.profileId += "/one";
                    obj.primers.list[2].params.profileId += "/two";

                    return obj;
                }
            }
        );
    }
};
