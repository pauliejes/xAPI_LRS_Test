/* global _suiteCfg */
"use strict";
var consistentThrough;

module.exports = {
    isConsistent: function (value) {
        if (! consistentThrough) {
            consistentThrough = new Date(require(_suiteCfg.persistence.statementStore + "/.consistent.json"));
        }

        //
        // date is before the date the the LRS is consistent through,
        // in other words check to see if the date passed has already
        // been acknowledged by the LRS
        //
        return new Date(value) <= consistentThrough;
    }
};
