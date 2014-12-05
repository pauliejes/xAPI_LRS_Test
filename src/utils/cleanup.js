"use strict";

var stringify = require("json-stable-stringify"),
    crypto = require("crypto"),
    buildGlobalRequests,
    _cache,
    _missing = {},
    _getCacheKey,
    _buildCache;

buildGlobalRequests = function () {
    return require("./_cleanup.json");
};

_getCacheKey = function (request) {
    return crypto.createHash("md5").update(stringify(request), "utf8").digest("hex");
};

_buildCache = function () {
    var existing = buildGlobalRequests();

    _cache = {};

    existing.forEach(
        function (v) {
            var hash = _getCacheKey(v);

            _cache[hash] = true;
        }
    );
};

module.exports = {
    buildGlobalRequests: buildGlobalRequests,

    isKnown: function (request, cfg) {
        var requestHash = _getCacheKey(request),
            result;

        cfg = cfg || { trackMissing: true };

        if (! _cache) {
            _buildCache();
        }

        result = _cache.hasOwnProperty(requestHash);

        if (! result && cfg.trackMissing && ! _missing.hasOwnProperty(requestHash)) {
            //
            // re-parse the stringified version so that it effectively
            // acts as a clone of the original, so further adjustment
            // of the original doesn't affect the output
            //
            _missing[requestHash] = JSON.parse(stringify(request));
        }

        return result;
    },

    missing: function () {
        return _missing;
    }
};
