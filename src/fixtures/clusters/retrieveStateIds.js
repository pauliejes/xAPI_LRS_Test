"use strict";
var factory = require("../../utils/factory");

factory.register(
    "retrieveStateIdsCluster",
    {
        typical: function () {
            var activityId = "http://tincanapi.com/conformancetest/uniqueActivityId/" + factory.make("good UUID"),
                obj = {
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

            obj.primers.list[0].params.activityId = activityId;
            obj.primers.list[1].params.activityId = activityId;
            obj.primers.list[2].params.activityId = activityId;

            obj.main.params.activityId = activityId;

            obj.primers.list[0].params.stateId = "http://tincanapi.com/conformancetest/statedoc/zero";
            obj.primers.list[1].params.stateId = "http://tincanapi.com/conformancetest/statedoc/one";
            obj.primers.list[2].params.stateId = "http://tincanapi.com/conformancetest/statedoc/two";

            return obj;
        },
        withRegistration: function () {
            var activityId = "http://tincanapi.com/conformancetest/uniqueActivityId/" + factory.make("good UUID"),
                reg = factory.make("good UUID"),
                obj = {
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

            obj.primers.list[0].params.registration = reg;
            obj.primers.list[1].params.registration = reg;
            obj.primers.list[2].params.registration = reg;

            obj.primers.list[0].params.activityId = activityId;
            obj.primers.list[1].params.activityId = activityId;
            obj.primers.list[2].params.activityId = activityId;

            obj.main.params.registration = reg;
            obj.main.params.activityId = activityId;

            obj.primers.list[0].params.stateId = "http://tincanapi.com/conformancetest/statedoc/zero";
            obj.primers.list[1].params.stateId = "http://tincanapi.com/conformancetest/statedoc/one";
            obj.primers.list[2].params.stateId = "http://tincanapi.com/conformancetest/statedoc/two";

            return obj;
        }
    }
);
