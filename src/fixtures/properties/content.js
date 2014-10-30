"use strict";
var factory = require("../../utils/factory");

module.exports = {
    init: function () {
        factory.register(
            "content",
            {
                "JSON": function () {
                    return JSON.stringify(
                        {
                            test: "JSON content",
                            obj: {
                                subObj: {
                                    nested: "content"
                                },
                                arr: [0, 1, "str"]
                            },
                            arr: [1.3, "item", 3.1]
                        }
                    );
                },
                string: "some string of content",
                emptyString: "",
                languageMap: {
                    "en-US": "Test Language Map"
                }
            }
        );
    }
};
