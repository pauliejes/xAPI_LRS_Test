"use strict";

var assertions = require("../utils/assertions"),
    makeRequest = require("../utils/request").makeRequest,
    English = require("yadda").localisation.English,
    fs = require("fs"),
    path = require("path"),
    util = require("util"),
    async = require("async"),
    factory = require("../utils/factory"),
    selectn = require("selectn"),
    moment = require("moment"),
    convertName,
    setObj,
    setAll,
    library;

convertName = function (name) {
    var map = {
        version: "X-Experience-API-Version",
        parameter: "params",
        parameters: "params",
        header: "headers",
        authority: "Authorization"
    };
    return map.hasOwnProperty(name) ? map[name] : name;
};

setObj = function (obj, subObj, value) {
    if (value.indexOf("'") === 0 && value.lastIndexOf("'") === value.length - 1) {
        obj[subObj] = value.substring(1, value.length - 1);
    }
    else if (value === "deleted" || value === "removed") {
        delete obj[subObj];
    }
    else if (value === "undefined") {
        obj[subObj] = undefined;
    }
    else if(value.indexOf("a") === 0 || value.indexOf("an") === 0 || value.indexOf("a(n)") === 0) {
        obj[subObj] = factory.make(value.split(" ").splice(1).join(" "));
    }
    else {
        obj[subObj] = factory.make(value);
    }
};

setAll = function (res, path, subObj, value) {
    var i;

    if (res.primers) {
        for(i = 0; i < res.primers.length; i += 1) {
            setObj(selectn(path, res.primers[i]), subObj, value);
        }
    }
    setObj(selectn(path, res.main), subObj, value);
    if (res.verify) {
        setObj(selectn(path, res.verify), subObj, value);
    }
};

library = English.library();

library.given(
    "([Ll]og|[Ii]nspect)",
    function (method, next) {
        var logFunc = this.logger;

        logFunc("-------------------------------");
        if (method.toLowerCase() === "inspect") {
            logFunc(util.inspect(this, { depth: null }));
        }
        else {
            logFunc(this);
        }
        logFunc("-------------------------------");

        next();
    }
);

library.given(
    "([Ll]og|[Ii]nspect) $object",
    function (method, object, next) {
        var logFunc = this.logger,
            splitObj = object.split(" "),
            type = false,
            toLog;

        if (["typeof", "typeOf"].indexOf(splitObj[0]) > -1) {
            type = true;
            splitObj = splitObj.splice(1);
        }
        if (["main", "primers", "verify"].indexOf(splitObj[0]) === -1) {
            splitObj.unshift("main");
        }
        if (type) {
            toLog = typeof (selectn(splitObj.join("."), this.scenarioResource));
        }
        else if (object === "scenarioResource") {
            toLog = this.scenarioResource;
        }
        else {
            toLog = selectn(splitObj.join("."), this.scenarioResource);
        }

        logFunc("-------------------------------");
        logFunc(object + ": ");
        if (method.toLowerCase() === "inspect") {
            logFunc(util.inspect(toLog, { depth: null }));
        }
        else {
            logFunc(toLog);
        }
        logFunc("-------------------------------");
        next();
    }
);

library.given(
    "(?:[Aa] |[Aa]n )$object request",
    function (object, next) {
        this.scenarioResource.main = {
            request: factory.make(object)
        };
        next();
    }
);

library.given(
    "(?:[Aa] |[Aa]n )$object request cluster",
    function (object, next) {
        var cluster = factory.make(object + "Cluster"),
            populate = function (targetArray) {
                var i, arr = [];
                for (i = 0; i < targetArray.length; i += 1) {
                    arr[i] = {
                        request: targetArray[i]
                    };
                }
                return arr;
            };

        //
        // Cluster.primers can be an array of requests or an object with two possible properties:
        // order (which can be "series" or "parallel", defaults to "series") and list (which is
        // an array of priming requests).
        //
        if (cluster.primers) {
            if (cluster.primers.hasOwnProperty("list")) {
                if (cluster.primers.order && cluster.primers.order === "parallel") {
                    this.scenarioResource.series = false;
                }
                else {
                    this.scenarioResource.series = true;
                }
                this.scenarioResource.primers = populate(cluster.primers.list);
            }
            else {
                this.scenarioResource.series = true;
                this.scenarioResource.primers = populate(cluster.primers);
            }
        }

        this.scenarioResource.main = {
            request: cluster.main
        };
        if (cluster.verify) {
            this.scenarioResource.verify = {
                request: cluster.verify
            };
        }
        next();
    }
);

library.given([
        "([Tt]he|[Tt]he main request's|[Aa]ll requests') $subObj (header|headers|parameter|parameters) (?:is|are) (?:changed|set) to $value",
        "([Tt]he|[Tt]he main request's|[Aa]ll requests') $subObj (header|headers|parameter|parameters) (?:is|are) (removed|deleted)"
    ],
    function (req, subObj, obj, value, next) {
        if (req.toLowerCase() === "the" || req.toLowerCase() === "the main request's") {
            setObj(this.scenarioResource.main.request[convertName(obj)], convertName(subObj), value);
        }
        else {
            setAll(this.scenarioResource, "request." + convertName(obj), convertName(subObj), value);
        }
        next();
    }
);

library.given([
        "([Tt]he|[Tt]he main request's|[Aa]ll requests') $objPath (?:is|are) (?:changed|set) to $value",
        "([Tt]he|[Tt]he main request's|[Aa]ll requests') $objPath (?:is|are) (removed|deleted)"
    ],
    function (req, objPath, value, next) {
        var path = objPath.split(" "),
            subObj;

        if (path[0] === "statement" || path[0] === "document") {
            path[0] = "content";
        }
        else if (path[0] === "attachment") {
            path[0] = "parts";
        }

        path.unshift("request");
        subObj = path.splice(-1,1);
        path = path.join(".");

        if (req.toLowerCase() === "the" || req.toLowerCase() === "the main request's") {
            setObj(selectn(path, this.scenarioResource.main), subObj[0], value);
        }
        else {
            setAll(this.scenarioResource, path, subObj[0], value);
        }
        next();
    }
);

library.given(
    "(?:[Tt]he) statement is read from file $fullPath",
    function (fullPath, next) {
        this.scenarioResource.main.request.content = require(fullPath);
        next();
    }
);

library.when(
    "(?:[Tt]he) (?:[Rr]equest) is (?:made|sent)",
    function (next) {
        this.scenarioResource.main.endpoint = this.scenarioResource.endpoint;

        makeRequest(this.scenarioResource.main, next, this);
    }
);

library.when(
    "(?:[Tt]he) request is made on the primed LRS",
    function (next) {
        var reqArr = [];
        this.scenarioResource.primers.forEach(
            function (req) {
                reqArr.push(
                    function (callback) {
                        req.endpoint = this.scenarioResource.endpoint;

                        makeRequest(
                            req,
                            function (err, res) {
                                if (err) {
                                    callback(new Error ("Request failed: " + err));
                                    return;
                                }
                                assertions.statusCodes(res.statusCode, [200, 204]);
                                callback(err, res);
                            },
                            this
                        );
                    }.bind(this)
                );
            }.bind(this)
        );
        async[this.scenarioResource.series ? "series" : "parallel"](
            reqArr,
            function (err) {
                this.scenarioResource.main.endpoint = this.scenarioResource.endpoint;

                err ? next(err) : makeRequest(this.scenarioResource.main, next, this);
            }.bind(this)
        );
    }
);

library.then(
    "(?:[Tt]he) ?LRS responds with HTTP $statusCodes",
    function (codes, next) {
        var statusCodes = codes.split(/(?:,)? (?:or )?/),
            status = this.scenarioResource.main.response.statusCode.toString();
        assertions.statusCodes(status, statusCodes);
        next();
    }
);

library.then(
    "(?:[Tt]he) request (?:is|was) successful",
    function (next) {
        var main = this.scenarioResource.main,
            status = main.response.statusCode,
            writeId;

        assertions.statusCodes(status, [200, 204]);

        if (status === 200) {
            writeId = JSON.parse(main.response.body)[0];
        }
        else {
            if (typeof main.request.content !== "undefined") {
                writeId = main.request.content.id;
            }
            else if (typeof main.request.parts !== "undefined") {
                writeId = main.request.parts[0]._body.id;
            }
            else {
                throw new Error("Unrecognized statement request format");
            }
        }

        fs.writeFile(
            path.join(this.statementStore, writeId + ".json"),
            JSON.stringify(
                {
                    stored: moment(),
                    hash: this.hash,
                    trace: this.trace,
                    structure: (typeof main.request.content !== "undefined" ? main.request.content : main.request.parts[0]._body)
                }
            ),
            function (err) {
                if (err) {
                    this.logger(err);
                }
                next();
            }
        );
    }
);

library.then(
    "(?:[Tt]he) response is a (?:correct|valid) $type response",
    function (type, next) {
        assertions.responseStructure(this.scenarioResource.main.response, type);
        next();
    }
);

module.exports = library;
