"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader"),
    helper = require("./helpers");

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
            "stateMergingCluster",
            {
                shallow: function () { return helper.merging.shallow("state"); },

                deep: function () { return helper.merging.deep("state"); },

                mergeJSONWithNotJSON: function () { return helper.merging.mergeJSONWithNotJSON("state"); },

                mergeNotJSONWithJSON: function () { return helper.merging.mergeNotJSONWithJSON("state"); },

                mergeWithRegistration: function() {
                    var obj = factory.make("deep stateMergingCluster"),
                        registration = factory.make("good UUID");

                    obj.primers[0].params.registration = registration;
                    obj.main.params.registration = registration;
                    obj.verify.params.registration = registration;

                    return obj;
                }
            }
        );
    }
};
