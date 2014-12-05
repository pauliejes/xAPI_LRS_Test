"use strict";

var url = require("url"),
    async = require("async"),
    utilRequest = require("../utils/request"),
    utilCleanup = require("../utils/cleanup"),
    VOIDED = "http://adlnet.gov/expapi/verbs/voided";

function clearDocuments (cfg, callback) {
    var requests = utilCleanup.buildGlobalRequests(),
        _requests = [],
        i,
        len;

    for (i = 0, len = requests.length; i < len; i += 1) {
        _requests.push(
            {
                request: requests[i],
                endpoint: cfg.lrs.endpoint
            }
        );
        _requests[i].request.headers = {};
        _requests[i].request.headers["X-Experience-API-Version"] = cfg.lrs.version;
        _requests[i].request.headers["Authorization"] = cfg.lrs.authString;
    }

    utilRequest.makeRequestSeries(_requests, callback);
}

function voidAllStatements (cfg, callback) {
    var more = null;

    async.doWhilst(
        function (callback) {
            var request = {
                    method: "GET",
                    resource: "statements",
                    headers: {
                        "X-Experience-API-Version": cfg.lrs.version,
                        Authorization: cfg.lrs.authString
                    }
                },
                epUrl;

            if (more !== null) {
                //
                // the more URL is appended to the root of the endpoint
                // as opposed to the endpoint itself
                //
                epUrl = url.parse(cfg.lrs.endpoint);

                request.resource = epUrl.protocol + "//" + epUrl.host + more;
            }
            else {
                // TODO: make configurable limit number of statements to fetch at a time
                //       add storage of a "since" value that we can import on next reset
                request.params = {
                    limit: 100
                };
            }

            utilRequest.makeRequest(
                {
                    request: request,
                    endpoint: cfg.lrs.endpoint
                },
                function (err, res) {
                    var postRequest,
                        sr;

                    if (err) {
                        callback(new Error("Request failed: " + err));
                        return;
                    }

                    if (res.statusCode !== 200) {
                        callback(new Error("Failed to fetch statements: " + res.body + " (" + res.statusCode + ")"));
                        return;
                    }

                    try {
                        sr = JSON.parse(res.body);
                    }
                    catch (ex) {
                        callback(new Error("Failed to JSON.parse statements result: " + ex));
                        return;
                    }

                    more = sr.more;

                    if (sr.statements.length > 0) {
                        postRequest = {
                            method: "POST",
                            resource: "statements",
                            headers: {
                                "X-Experience-API-Version": cfg.lrs.version,
                                Authorization: cfg.lrs.authString,
                                "Content-Type": "application/json",
                            },
                            content: []
                        };

                        sr.statements.forEach(
                            function (v) {
                                if (v.verb.id !== VOIDED) {
                                    postRequest.content.push(
                                        {
                                            actor: v.actor,
                                            verb: { id: VOIDED },
                                            object: {
                                                id: v.id,
                                                objectType: "StatementRef"
                                            }
                                        }
                                    );
                                }
                            }
                        );

                        if (postRequest.content.length > 0) {
                            utilRequest.makeRequest(
                                {
                                    request: postRequest,
                                    endpoint: cfg.lrs.endpoint
                                },
                                function (err, res) {
                                    if (err) {
                                        callback(new Error("Request failed: " + err));
                                        return;
                                    }

                                    if (res.statusCode !== 200) {
                                        callback(new Error("Failed to post voiding statements: " + res.body + " (" + res.statusCode + ")"));
                                        return;
                                    }

                                    callback();
                                },
                                {}
                            );
                            return;
                        }
                    }

                    callback();
                },
                {}
            );
        },
        function () {
            return (typeof more !== "undefined" && more !== null);
        },
        callback
    );
}

module.exports = function (grunt) {
    grunt.registerTask(
        "reset",
        "Reset the LRS documents and statements",
        function () {
            var done = this.async(),
                cfg = grunt.config("suite");

            async.parallel(
                [
                    function (callback) {
                        clearDocuments(
                            cfg,
                            function (err) {
                                if (err) {
                                    grunt.log.error("Failed to clear documents: " + err);
                                }
                                else {
                                    grunt.log.ok("Cleared documents");
                                }
                                callback(err);
                            }
                        );
                    },
                    function (callback) {
                        voidAllStatements(
                            cfg,
                            function (err) {
                                if (err) {
                                    grunt.log.error("Failed to void all statements: " + err);
                                }
                                else {
                                    grunt.log.ok("Voided all statements");
                                }
                                callback(err);
                            }
                        );
                    }
                ],
                function () {
                    done();
                }
            );
        }
    );
};
