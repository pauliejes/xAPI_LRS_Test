"use strict";
var fs = require("fs"),
    path = require("path"),
    PassThrough = require("stream").PassThrough,
    sprintf = require("sprintf-js").sprintf,
    colors = require("colors"),
    labels = {
        "stage1:core":               "Stage 1 - Core",
        "stage1:conflict":           "Stage 1 - Conflicts",
        "stage1:adhocValid":         "Stage 1 - Adhoc Valid",
        "stage1:adhocInvalid":       "Stage 1 - Adhoc Invalid",
        "stage2:statementStructure": "Stage 2 - Statement Structure",
        "stage2:conflict":           "Stage 2 - Conflicts",
        "stage2:streamQueries":      "Stage 2 - Stream Queries"
    };

function writeResults (results, stream) {
    /* jshint maxdepth: 4 */
    var passed = 0,
        failed = 0,
        pending = 0;

    stream.write(colors.underline.yellow("Summary") + "\n");
    Object.keys(labels).forEach(
        function (k) {
            var result = results[k];

            if (result === null) {
                result = "Not Run";
            }
            else {
                result = "";
                if (results[k].passed === null && results[k].failed === null && results[k].pendingConsistency === null) {
                    result += "None";
                }
                else {
                    if (results[k].passed !== null) {
                        result += colors.green("Passed (" + results[k].passed + ")");
                        passed += results[k].passed;
                    }
                    if (results[k].failed !== null) {
                        if (result !== "") {
                            result += ", ";
                        }
                        result += colors.red("Failed (" + results[k].failed + ")");
                        failed += results[k].failed;
                    }
                    if (results[k].pendingConsistency !== null) {
                        if (result !== "") {
                            result += ", ";
                        }
                        result += colors.blue("Pending Consistency (" + results[k].pendingConsistency + ")");
                        pending += results[k].pendingConsistency;
                    }
                    if (results[k].pendingLocally !== null) {
                        if (result !== "") {
                            result += ", ";
                        }
                        result += colors.blue("Pending Locally (" + results[k].pendingLocally + ")");
                        pending += results[k].pendingLocally;
                    }
                }
                if (typeof results[k].limited !== "undefined") {
                    result += " (Limited: " + results[k].limited + ")";
                    results.limited = 1;
                }
            }

            stream.write(sprintf("%-30s", labels[k] + ":"));
            stream.write(" [ ");
            stream.write(String(result));
            stream.write(" ]\n");
        }
    );

    stream.write(sprintf("%-30s", "Overall:"));
    stream.write(" [ ");
    if (failed > 0) {
        stream.write(colors.red("Failed"));
        results.overall = 1;
    }
    else if (pending > 0) {
        stream.write(colors.blue("Pending"));
        results.overall = 2;
    }
    else if (passed > 0) {
        stream.write(colors.green("Passed"));
        results.overall = 0;
    }
    else {
        stream.write("No Tests");
        results.overall = null;
    }
    stream.write(" ]\n");
}

module.exports = function (grunt) {
    grunt.registerTask(
        "summary",
        "Output a summary of test results",
        function () {
            var done = this.async(),
                cfg = grunt.config("suite"),
                summaryFile,
                multi = new PassThrough();

            multi.on(
                "data",
                function (chunk) {
                    process.stdout.write(chunk);
                    summaryFile.write(chunk);
                }
            );
            multi.on(
                "end",
                function () {
                    try {
                        fs.writeFileSync(
                            path.join(cfg._logDir, "summary.json"),
                            JSON.stringify(cfg._results, null, 4)
                        );
                    } catch (ex) {
                        grunt.log.error("Unable to write summary JSON file: " + ex);
                    }
                }
            );

            summaryFile = fs.createWriteStream(
                path.join(cfg._logDir, "summary.log")
            );
            summaryFile.on(
                "open",
                function () {
                    this.write(cfg._runDetails);

                    writeResults(cfg._results, multi);
                    multi.end();
                }
            );
            summaryFile.on(
                "error",
                function (err) {
                    writeResults(cfg._results, multi);
                    multi.end();

                    grunt.log.error("Failed to open summary log for writing: " + err);
                }
            );
            summaryFile.on(
                "end",
                function () {
                    done();
                }
            );
        }
    );
};
