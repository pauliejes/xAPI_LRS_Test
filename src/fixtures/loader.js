"use strict";
var cache = {};

module.exports = {
    load: function (fixtures, options) {
        fixtures.forEach(
            function(file) {
                if (cache[file]) {
                    return;
                }

                // TODO: improve to allow resolving outside of "fixtures/"
                require("./" + file).init(options);
                cache[file] = true;
            }
        );
    }
};
