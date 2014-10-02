"use strict";
var request = require("request");

module.exports = function (grunt) {
    grunt.registerTask(
        "clearSandbox",
        "Cleans up statements sent to a sandbox during testing",
        function () {
            var done,
                cfg = grunt.config("suite");

            if (cfg.lrs.endpoint.indexOf("sandbox") === -1) {
                grunt.fail.warn("Not a sandbox");
            }

            done = this.async();

            request(
                {
                    url: cfg.lrs.endpoint + "extended?action=clear_sandbox",
                    method: "GET",
                    headers: {
                        "X-Experience-API-Version": cfg.lrs.version,
                        "Authorization": cfg.lrs.authString
                    }
                },
                function (err) {
                    if (err) {
                        grunt.fail.warn(err);
                    }
                    done(err);
                }
            );
        }
    );
};
