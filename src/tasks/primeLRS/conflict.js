"use strict";
var fs = require("fs"),
    path = require("path"),
    mkdirp = require("mkdirp"),
    moment = require("moment"),
    factory = require("../../utils/factory"),
    fixtures = require("../../fixtures/loader"),
    utilRequest = require("../../utils/request");

module.exports = function conflict (cfg, callback) {
    fixtures.load(["requests/saveStatement"], cfg);

    var controlReq = {
        endpoint: cfg.lrs.endpoint,
        request: factory.make("typical saveStatement")
    };

    utilRequest.makeRequest(
        controlReq,
        function (err, res) {
            var conflictDir;

            if (err) {
                callback(new Error("Request failed: " + err));
                return;
            }

            if (res.statusCode !== 204) {
                callback(new Error("Control statement failed to save: " + res.body + " (" + res.statusCode + ")"));
                return;
            }

            conflictDir = path.join(
                cfg.persistence.conflicts,
                controlReq.request.params.statementId
            );

            mkdirp(
                conflictDir,
                function (err) {
                    if (err) {
                        callback(new Error("Failed to create conflict directory: " + err));
                        return;
                    }

                    fs.writeFile(
                        path.join(conflictDir, "control.json"),
                        JSON.stringify(
                            {
                                structure: controlReq.request.content,
                                stored: moment()
                            },
                            null,
                            4
                        ),
                        function (err) {
                            if (err) {
                                callback(new Error("Failed to save conflict control file: " + err));
                                return;
                            }
                            callback();
                        }
                    );
                }
            );
        },
        {}
    );
};
