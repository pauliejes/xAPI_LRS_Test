/* global _suiteCfg */
"use strict";
var consistentThrough;

module.exports = {
    isConsistent: function (value) {
        var consistentFile = _suiteCfg.persistence.statementStore + "/.consistent.json",
            consistentValue;

        if (! consistentThrough) {
            try {
                consistentValue = require(consistentFile);
            }
            catch (e) {
                if (e.code === "MODULE_NOT_FOUND") {
                    throw new Error(".consistent.json does not exist (hint: run 'updateConsistent' task)");
                }
                throw new Error(".consistent.json could not be required: " + e);
            }

            consistentThrough = new Date(consistentValue);
        }

        //
        // date is before the date the the LRS is consistent through,
        // in other words check to see if the date passed has already
        // been acknowledged by the LRS
        //
        return new Date(value) <= consistentThrough;
    }
};
