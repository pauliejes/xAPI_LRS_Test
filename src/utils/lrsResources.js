var lrsCfg = require("../config.json");

module.exports = {
    authString: "Basic " + new Buffer(lrsCfg.username + ":" + lrsCfg.password).toString("base64"),
    version: lrsCfg.version,
    endpoint: lrsCfg.endpoint,
    user: lrsCfg.username,
    pass: lrsCfg.password,
};
