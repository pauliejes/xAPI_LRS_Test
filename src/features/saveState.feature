Feature: saveState

Scenario: Good save state: [type] request

    Given a [type] saveState request
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type
        204  | typical
        204  | JSON

Scenario: Good save state: [type] request missing [property]

    Given a [type] saveState request
    Given the [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property
        204  | typical | Content-Type header
        204  | typical | content
        204  | JSON    | content

Scenario: Good save state: [type] request with [property] set to [value]

    Given a [type] saveState request
    Given the [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property             | value
        204  | typical | Content-Type header  | test content type
        204  | typical | stateId parameter    | test state id
        204  | typical | activityId parameter | test activity id
        204  | typical | agent parameter      | an mboxAndType agent
        204  | typical | agent parameter      | an mboxSha1AndType agent
        204  | typical | agent parameter      | an openidAndType agent
        204  | typical | agent parameter      | an accountAndType agent
        204  | typical | agent parameter      | an mboxOnly agent
        204  | typical | agent parameter      | an mboxSha1Only agent
        204  | typical | agent parameter      | an openidOnly agent
        204  | typical | agent parameter      | an accountOnly agent
        204  | typical | content              | test content
        204  | typical | content              | a typical statement

Scenario: Good save state: JSON request with unique stateId with method set to POST

    Given a JSON saveState request
    Given the stateId parameter is set to a unique URI
    Given the method is set to POST
    When the request is made
    Then the LRS responds with HTTP 204

Scenario: Bad save state: [type] request missing [property]

    Given a [type] saveState request
    Given the [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property
        400  | typical | version header
        401  | typical | authority header
        400  | typical | stateId parameter
        400  | typical | activityId parameter
        400  | typical | agent parameter

Scenario: Bad save state: [type] request with bad [property] '[value]'

    Given a [type] saveState request
    Given the [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property             | value
        400  | typical | resource             | activity/state
        400  | typical | resource             | activities/states
        400  | typical | version header       | bad version
        400  | typical | version header       | 3.8.0
        400  | typical | authority header     | Basic badAuth
        401  | typical | authority header     | Basic TnsHNWplME1YZnc0VzdLTHRIWTo0aDdBb253Ml85WU53vSZLNlVZ
        400  | typical | method               | POST
        400  | typical | agent parameter      | an empty agent

Scenario: Bad save state: [type] request with [modifier] agent parameter with bad [property] '[value]'

    Given a [type] saveState request
    Given the agent parameter is set to a [modifier] agent
    Given the params agent [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | modifier        | property         | value
        400  | typical | mboxAndType     | mbox             | conformancetest@tincanapi.com
        400  | typical | mboxAndType     | mbox             | bad mbox
        400  | typical | mboxAndType     | objectType       | notAgent
        400  | typical | mboxAndType     | objectType       | Activity
        400  | typical | mboxOnly        | mbox             | conformancetest@tincanapi.com
        400  | typical | mboxOnly        | mbox             | bad mbox
        400  | typical | mboxAndType     | objectType       | agent
        400  | typical | openidAndType   | openid           | badURI
        400  | typical | openidOnly      | openid           | badURI
        400  | typical | accountAndType  | account homePage | badURI
        400  | typical | accountOnly     | account homePage | badURI

Scenario: Bad save state: [type] request [modifier] agent parameter missing [property]

    Given a [type] saveState request
    Given the agent parameter is set to a [modifier] agent
    Given the params agent [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | modifier        | property
        400  | typical | accountAndType  | account homePage
        400  | typical | accountAndType  | account name
        400  | typical | accountOnly     | account homePage
        400  | typical | accountOnly     | account name
        400  | typical | mboxAndType     | mbox
