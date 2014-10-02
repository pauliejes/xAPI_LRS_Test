"use strict";
var factory = require("../../utils/factory");

factory.register(
    "retrieveStateIdsCluster",
    {
        typical: function () {
            var obj = {
                    primers: {
                        order: "parallel",
                        list: [
                            factory.make("typical saveState"),
                            factory.make("typical saveState"),
                            factory.make("typical saveState")
                        ]
                    },
                    main: factory.make("typical retrieveStateIds")
                };

            obj.primers.list[0].params.stateId += "/zero";
            obj.primers.list[1].params.stateId += "/one";
            obj.primers.list[2].params.stateId += "/two";

            return obj;
        },
        withRegistration: function () {
            var obj = {
                    primers: {
                        order: "parallel",
                        list: [
                            factory.make("withRegistration saveState"),
                            factory.make("withRegistration saveState"),
                            factory.make("withRegistration saveState")
                        ]
                    },
                    main: factory.make("withRegistration retrieveStateIds")
                };

            obj.primers.list[0].params.stateId += "/zero";
            obj.primers.list[1].params.stateId += "/one";
            obj.primers.list[2].params.stateId += "/two";

            return obj;
        }
    }
);
