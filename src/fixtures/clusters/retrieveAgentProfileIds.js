"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        fixtures.load(
            [
                "requests/saveAgentProfile",
                "requests/retrieveAgentProfileIds"
            ],
            cfg
        );

        factory.register(
            "retrieveAgentProfileIdsCluster",
            {
                typical: function () {
                    var obj = {
                        primers: {
                            order: "parallel",
                            list: [
                                factory.make("typical saveAgentProfile"),
                                factory.make("typical saveAgentProfile"),
                                factory.make("typical saveAgentProfile")
                            ]
                        },
                        main: factory.make("typical retrieveAgentProfileIds")
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
