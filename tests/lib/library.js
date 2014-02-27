
if(process.browser) {
    var request = require('browser-request');
} else {
    var request = require('request');
}

var Yadda = require('yadda');
var English = Yadda.localisation.English;
var Dictionary = Yadda.Dictionary;

var dictionary = new Dictionary()
        .define('STATUS', /(\d+)/);

module.exports = (function() {

    var endpoint = "http://cloud.scorm.com/tc/public/statements";
    var username = "test";
    var password = "somepass";


    var context = {
        statements: []
    };

    var library = English.library(dictionary)

    .given('a statement', function(done) {
        context.statements.push({
            actor: {
                mbox: "mailto:a@example.com"
            },
            verb: {
                id: "http://example.com/verbs/example_verb"
            },
            object: {
                id: "http://example.com/activities/example_activity"
            }
        });
        done();
    })

    .when('sent', function(done) {
        request.post({
            url: endpoint,
            auth: {
                username: username,
                password: password
            },
            json: context.statements,
            headers: {
                'content-type': 'application/json',
                'x-experience-api-version': '1.0.0'
            }
        }, function(error, response, body) {
            console.log(body);
            context.response = response;
            done();
        });
    })

    .then('should respond $STATUS', function(status, done) {
        expect(context.response.statusCode).toBe(parseInt(status));
        done();
    })


    

    return library;
})();
