"use strict";
var factory = require("../../utils/factory"),
    fixtures = require("../loader");

function buildWithAttachment (statement, attachment, lrs) {
    statement.attachments = [
        attachment.statementMetadata
    ];

    return {
        "resource": "statements",
        "headers": {
            "X-Experience-API-Version": lrs.version,
            "Authorization": lrs.authString,
            "Content-Type": "multipart/mixed"
        },
        "method": "PUT",
        "params": {
            "statementId": statement.id
        },
        "parts": [
            {
                "Content-Type": "application/json",
                body: statement
            },
            {
                "Content-Type": attachment.statementMetadata.contentType,
                "X-Experience-API-Hash": attachment.statementMetadata.sha2,
                body: attachment.content
            }
        ]
    };
}

module.exports = {
    init: function (cfg) {
        var lrs = cfg.lrs;

        fixtures.load(
            [
                "properties/attachment",
                "properties/statement"
            ],
            cfg
        );

        factory.register(
            "saveStatement",
            {
                minimal: {
                    "resource": "statements",
                    "headers": {
                        "X-Experience-API-Version": lrs.version,
                        "Authorization": lrs.authString,
                        "Content-Type": "application/json"
                    },
                    "method": "POST",
                    "params": {},
                    "content": factory.make("minimal statement")
                },
                typical: function () {
                    var obj = factory.make("typical statement");

                    return {
                        "resource": "statements",
                        "headers": {
                            "X-Experience-API-Version": lrs.version,
                            "Authorization": lrs.authString,
                            "Content-Type": "application/json"
                        },
                        "method": "PUT",
                        "params": {
                            "statementId": obj.id
                        },
                        "content": obj
                    };
                },

                //
                // when using this fixture you *must* add the "object" of the statement,
                // and set the id from that object in the `params.statementId` property
                //
                voiding: function () {
                    var obj = factory.make("voiding statement");

                    return {
                        "resource": "statements",
                        "headers": {
                            "X-Experience-API-Version": lrs.version,
                            "Authorization": lrs.authString,
                            "Content-Type": "application/json"
                        },
                        "method": "PUT",
                        "params": {},
                        "content": obj
                    };
                },
                activity: function () {
                    var obj = factory.make("typical statement");

                    return {
                        "resource": "statements",
                        "headers": {
                            "X-Experience-API-Version": lrs.version,
                            "Authorization": lrs.authString,
                            "Content-Type": "application/json"
                        },
                        "method": "PUT",
                        "params": {
                            "statementId": obj.id
                        },
                        "content": obj
                    };
                },
                attachment: function () {
                    return buildWithAttachment(factory.make("typical statement"), factory.make("text attachment"), lrs);
                },
                attachmentJSON: function () {
                    return buildWithAttachment(factory.make("typical statement"), factory.make("JSON attachment"), lrs);
                },
                attachmentFileUrlOnly: function () {
                    var request = factory.make("typical saveStatement"),
                        attachment = factory.make("fileUrlOnly attachment");

                    request.content.attachments = [ attachment.statementMetadata ];

                    return request;
                }
            }
        );
    }
};
