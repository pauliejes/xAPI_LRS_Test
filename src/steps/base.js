/* global _suiteCfg */
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
        var logFunc = _suiteCfg._logger;

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
        var logFunc = _suiteCfg._logger,
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
            i,
            populate = function (targetArray) {
                var arr = [];
                for(i = 0; i < targetArray.length; i += 1) {
                    arr[i] = {
                        request: targetArray[i]
                    };
                }
                return arr;
            }
        ;

        //Cluster.primers can be an array of requests or an object with two possible properties:
        //order (which can be "series" or "parallel", defaults to "series") and list (which is
        //an array of priming requests).
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

library.when(
    "(?:[Tt]he) (?:[Rr]equest) is (?:made|sent)",
    function (next) {
        makeRequest(this.scenarioResource.main, next);
    }
);

library.when(
    "(?:[Tt]he) request is made on the primed LRS",
    function (next) {
        var reqArr = [];
        this.scenarioResource.primers.forEach(function (req) {
            reqArr.push(
                function (callback) {
                    makeRequest(
                        req,
                        function (err, res) {
                            assertions.statusCodes(res.statusCode, [200, 204]);
                            callback(err, res);
                        }
                    );
                }
            );
        });
        async[this.scenarioResource.series ? "series" : "parallel"](
            reqArr,
            function (err) {
                err ? next(err) : makeRequest(this.scenarioResource.main, next);
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
        var status = this.scenarioResource.main.response.statusCode,
            writeId;

        assertions.statusCodes(status, [200, 204]);
        writeId = status === 200 ?
            JSON.parse(this.scenarioResource.main.response.body)[0] :
            this.scenarioResource.main.request.content.id;

        fs.writeFile(
            path.join(__dirname, "../var/statements", writeId + ".json"),
            JSON.stringify(
                {
                    stored: moment(),
                    hash: this.hash,
                    trace: this.trace,
                    structure: this.scenarioResource.main.request.content
                }
            ),
            function (err) {
                if (err) {
                    _suiteCfg.logger(err);
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
