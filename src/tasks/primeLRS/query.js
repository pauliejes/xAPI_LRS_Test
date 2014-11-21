"use strict";
var async = require("async"),
    fs = require("fs"),
    path = require("path"),
    moment = require("moment"),
    factory = require("../../utils/factory"),
    fixtures = require("../../fixtures/loader"),
    utilRequest = require("../../utils/request");

module.exports = function (cfg, callback) {
    fixtures.load(
        [
            "queries",
            "properties/UUID"
        ],
        cfg
    );

    var reg = factory.make("unique UUID"),
        groups = {
            empty: [],
            all: [],
            allAscending: []
        },
        began = moment(),
        funcs = [];

    //
    // these are in an intentionally messy order
    //
    var cfgs = [
        "plain",
        "actorMboxAgent",
        "actorMboxSha1Agent",
        "objectActivity",
        "verb",
        { label: "registration", cfg: { reg: reg } },
        "contextActivityParent",
        "actorMboxAgent",
        "objectActivity",
        "actorMboxSha1Agent",
        "verb",
        "actorMboxAgent",
        "objectActivity",
        "contextActivityParent",
        { label: "registration", cfg: { reg: reg } },
        "actorMboxSha1Agent",
        "contextActivityGrouping",
        "contextInstructorMboxAgent",
        "contextInstructorMboxSha1Agent"
    ];

    cfgs.forEach(
        function (v) {
            funcs.push(
                function (next) {
                    var queryCfg,
                        now;

                    if (typeof v === "object") {
                        queryCfg = factory.make(v.label + " queryCfg", v.cfg);
                    }
                    else {
                        queryCfg = factory.make(v + " queryCfg");
                    }

                    now = moment();
                    utilRequest.makeRequest(
                        {
                            endpoint: cfg.lrs.endpoint,
                            request: queryCfg.req
                        },
                        function (err, res) {
                            if (err) {
                                next(err);
                                return;
                            }

                            if (res.statusCode !== 204) {
                                next(new Error("Control statement failed to save: " + res.body + " (" + res.statusCode + ")"));
                                return;
                            }

                            groups.all.unshift(queryCfg.req.content.id);
                            groups.allAscending.push(queryCfg.req.content.id);
                            queryCfg.tests.forEach(
                                function (label) {
                                    groups[label] = groups[label] || [];
                                    groups[label].unshift(queryCfg.req.content.id);
                                }
                            );

                            next(null, { id: queryCfg.req.content.id, sent: now });
                        },
                        {}
                    );
                }
            );
        }
    );

    async.series(
        funcs,
        function (err, results) {
            var meta;

            if (err) {
                callback(new Error("Query statement priming failed: " + err));
                return;
            }

            meta = {
                registration: reg,
                statements: {},
                begin: began,
                end: moment(),
                groups: groups
            };
            results.forEach(
                function (v) {
                    var id = v.id;
                    delete v.id;

                    meta.statements[id] = v;
                }
            );

            fs.writeFile(
                path.join(cfg.persistence.queries, reg + ".json"),
                JSON.stringify(meta, null, 4),
                function (err) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    callback();
                }
            );
        }
    );
};
