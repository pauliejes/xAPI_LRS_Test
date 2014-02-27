var Yadda = require('yadda');
var $ = require('./Array');

module.exports = exports = {};

if(typeof(features) !== 'undefined') {
    exports.text_features = true;
    exports.features = $(features);
} else {
    exports.text_features = false;
    exports.features = new Yadda.FeatureFileSearch('features');
}