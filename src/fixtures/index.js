"use strict";
var fs = require("fs"),
    startDir = require("path").resolve(__dirname, "."),
    cacheFixtures = function (dir) {
        var files = fs.readdirSync(dir);
        files.forEach(
            function (file) {
                var stat;
                if (file[0] !== "." && file.indexOf("index.js") !== 0) {
                    file = dir + "/" + file;
                    stat = fs.statSync(file);
                    (stat && stat.isDirectory()) ? cacheFixtures(file) : require(file);
                }
            }
        );
    }
;

cacheFixtures(startDir);
