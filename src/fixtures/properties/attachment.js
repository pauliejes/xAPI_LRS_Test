"use strict";
var factory = require("../../utils/factory");

module.exports = {
    init: function () {
        factory.register(
            "attachment",
            {
                text: {
                    statementMetadata: {
                        usageType: "http://id.tincanapi.com/attachment/supporting_media",
                        display: {
                            "en-US": "Text attachment"
                        },
                        contentType: "text/plain",
                        length: 18,
                        sha2: "bd1a58265d96a3d1981710dab8b1e1ed04a8d7557ea53ab0cf7b44c04fd01545"
                    },
                    content: "some text content"
                },
                "JSON": {
                    statementMetadata: {
                        usageType: "http://id.tincanapi.com/attachment/supporting_media",
                        display: {
                            "en-US": "JSON attachment"
                        },
                        contentType: "application/json",
                        length: 60,
                        sha2: "f4135c31e2710764604195dfe4e225884d8108467cc21670803e384b80df88ee"
                    },
                    content: "{\"propertyA\":\"value1\",\"propertyB\":\"value2\",\"propertyC\":true}"
                },
                fileUrlOnly: {
                    statementMetadata: {
                        usageType: "http://id.tincanapi.com/attachment/supporting_media",
                        display: {
                            "en-US": "FileUrl Only attachment"
                        },
                        contentType: "application/octet-stream",
                        length: 65556,
                        sha2: "d14f1580a2cebb6f8d4a8a2fc0d13c67f970e84f8d15677a93ae95c9080df899",
                        fileUrl: "http://tincanapi.com/conformancetest/attachment/fileUrlOnly"
                    }
                }
            }
        );
    }
};
