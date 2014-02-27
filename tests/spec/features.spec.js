
var Yadda = require('yadda');

var jasmine = require('../lib/JasmineCustomPlugin');


var library = require('../lib/library');

var loader = require('../lib/FeatureLoader');

jasmine({
    text_features: loader.text_features
});

loader.features.each(function(name) {
    feature(name, function(feature_structure) {

        var yadda = new Yadda.Yadda(library);

        scenarios(feature_structure.scenarios, function(scenario, done) {
            yadda.yadda(scenario.steps, done);
        });
    });
});
