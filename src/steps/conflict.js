"use strict";

var English = require("yadda").localisation.English,
    factory = require("../utils/factory"),
    mkdirp = require("mkdirp"),
    path = require("path"),
    fs = require("fs"),
    library;

library = English.library();

library.given(
    "(?:[Tt]he) control statementId saveStatement request",
    function (next) {
        this.scenarioResource.main = {
            request: factory.make("typical saveStatement")
        };
        this.scenarioResource.main.request.params.statementId = this.featureResource.conflictDir;
        this.scenarioResource.main.request.content.id = this.featureResource.conflictDir.slice(this.featureResource.conflictDir.lastIndexOf("/") + 1);
        next();
    }
);

library.given(
    "(?:[Tt]he) control structure for ID: $id",
    function (id, next) {
        this.featureResource.conflictBaseDir = path.join(this.featureResource.conflictBaseDir, id);
        next();
    }
);

library.given(
    "(?:[Tt]he) conflicting property $test in $categoryDir",
    function (test, categoryDir, next) {
        this.scenarioResource.conflictingProperty = path.join(categoryDir, test);
        next();
    }
);

library.when(
    "(?:[Tt]he) control structure is loaded",
    function (next) {
        this.scenarioResource.compareStructure = require(path.join(this.featureResource.conflictBaseDir, "control.json"));
        this.featureResource.retrievedStructure = require(path.join(this.featureResource.conflictBaseDir, "retrieved.json"));
        next();
    }
);

library.when(
    "(?:[Tt]he) conflicting structure is loaded",
    function (next) {
        this.scenarioResource.compareStructure = require(path.join(this.featureResource.conflictBaseDir, this.scenarioResource.conflictingProperty));
        next();
    }
);

library.then(
    "(?:[Tt]he) $testCategory $testName conflicting statement is sent successfully",
    function (testCategory, testName, next) {
        var conflictSubDir = path.join(this.featureResource.conflictDir, testCategory);
        mkdirp.sync(conflictSubDir);
        fs.writeFile(
            path.join(conflictSubDir, testName + ".json"),
            JSON.stringify(this.scenarioResource.main.request.content),
            function (err) {
                if (err) {
                    this._logger(err);
                }
                next();
            }
        );
    }
);

module.exports = library;
