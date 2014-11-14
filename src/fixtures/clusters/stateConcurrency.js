"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader"),
    assert = require("assert"),
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
            "stateConcurrencyCluster",
            {
                noneMatch: function () { return helper.concurrency.noneMatch("state"); },

                incorrectNoneMatch: function () { return helper.concurrency.incorrectNoneMatch("state"); },

                correctMatch: function () { return helper.concurrency.correctMatch("state"); },

                incorrectMatch: function () { return helper.concurrency.incorrectMatch("state"); },

                correctMatchWithRegistration: function () {
                    var registration = factory.make("good UUID"),
                        obj = {
                            primers: [
                                factory.make("ifNoneMatch saveState")
                            ],
                            main: factory.make("typical saveState"),
                            verify: factory.make("typical retrieveState"),
                            validate: function (res) {
                                assert.equal(JSON.parse(res.headers.etag), "102B16CE866BBBB6CEA75CB663DCDCB0712100A3");
                            }
                        };

                    obj.primers[0].params.registration = registration;
                    obj.main.params.registration = registration;
                    obj.verify.params.registration = registration;

                    obj.primers[0].content = "State concurrency test: correctMatchWithRegistration";

                    obj.main.headers["If-Match"] = "B7A124BF1D7A7C522C20861FCDD3F8FA2B5E0999";
                    obj.main.content = "State concurrency test: correctMatchWithRegistration (updated)";

                    return obj;
                },

                ifMatchAndIfNoneMatch: function () { return helper.concurrency.ifMatchAndIfNoneMatch("state"); }
            }
        );
    }
};
