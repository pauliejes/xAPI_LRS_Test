"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

module.exports = {
    init: function (cfg) {
        fixtures.load(
            [
                "properties/UUID",
                "properties/agent",
                "properties/verb",
                "properties/activity",
                "properties/result",
                "properties/context",
                "properties/attachment"
            ],
            cfg
        );

        factory.register(
            "statement",
            {
                "empty": {},
                "minimal": {
                    "actor": factory.make("typical agent"),
                    "verb": factory.make("typical verb"),
                    "object": factory.make("typical activity")
                },
                "typical": function () {
                    return {
                        "actor": factory.make("typical agent"),
                        "verb": factory.make("typical verb"),
                        "object": factory.make("typical activity"),
                        "id": factory.make("unique UUID"),
                        "timestamp": "2014-07-23T12:34:02-05:00"
                    };
                },

                //
                // when using this fixture you *must* add the "object" of the statement
                //
                "voiding": function () {
                    return {
                        "actor": factory.make("typical agent"),
                        "verb": factory.make("voiding verb"),
                        "id": factory.make("unique UUID")
                    };
                },
                "attachment": {
                    "actor": factory.make("typical agent"),
                    "verb": factory.make("typical verb"),
                    "object": factory.make("typical activity"),
                    "attachments": [
                        factory.make("text attachment").statementMetadata
                    ]
                }
            }
        );
    }
};
