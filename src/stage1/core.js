/* global featureFile, scenarios, steps, _featureSpec, after */
"use strict";

var Yadda = require("yadda"),
    Glob = require("glob").Glob,
    libraries = require("../steps"),
    interpreterContext = {},
    runner = new Yadda.Yadda(libraries, interpreterContext),

    // the Glob instance used to find the files and directories
    // based on the _featureSpec provided via the requires in
    // the Gruntfile
    g,

    // list of non-directory files found by the glob
    files = [],

    // list of directories found by the glob
    dirs = [],

    // a cache of the feature files that have already been run
    // since features may be found as part of a directory and
    // on their own, but we only ever want to run them once
    cache = {};

Yadda.plugins.mocha.AsyncStepLevelPlugin.init();

//
// simple routine that takes a file name to pass to the Yadda runner
// and cache it so that it only ever gets run once
//
function runFeatureFile (file) {
    if (cache[file]) {
        return;
    }

    cache[file] = true;

    featureFile(
        file,
        function(feature) {
            var featureResource = {};

            scenarios(
                feature.scenarios,
                function(scenario) {
                    var scenarioResource = {},
                        trace = [];

                    steps(
                        scenario.steps,
                        function(step, done) {
                            trace.push(step);

                            runner.yadda(
                                step,
                                {
                                    featureResource: featureResource,
                                    scenarioResource: scenarioResource,
                                    trace: trace
                                },
                                done
                            );
                        }
                    );
                }
            );
        }
    );
}

//
// have to use a sync call here because of how Mocha handles
// the test files, the async versions never reached the callback
// capture the instance so that we can leverage the cache that
// glob builds for determining whether a file is a directory or
// not since we handle them differently
//
g = new Glob(
    _featureSpec,
    {
        sync: true
    }
);

//
// g.found is the list of all matches (dirs + files)
//
g.found.forEach(
    function (match) {
        //
        // files are represented in the object as either 1 or true
        //
        if (g.cache[match] === 1 || g.cache[match] === true) {
            files.push(match);
        }
        //
        // directories are represented as either 2 or an array
        //
        else if (g.cache[match] === 2 || Array.isArray(g.cache[match])) {
            dirs.push(match);
        }
    }
);

//
// TODO: better to run directories first or single files first?
//

dirs.forEach(
    function (dir) {
        new Yadda.FeatureFileSearch(dir).each(
            function(file) {
                runFeatureFile(file);
            }
        );
    }
);
files.forEach(
    function (file) {
        runFeatureFile(file);
    }
);
