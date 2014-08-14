Feature: saveState

Scenario: should return HTTP [HTTP] when a(n) [type] saveState request is sent

    Given a [type] saveState request
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type
        204  | typical

Scenario: should return HTTP [HTTP] when a(n) [type] saveState request is sent without a [property]

    Given a [type] saveState request
    Given the [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property
        400  | typical | version header
        401  | typical | authority header
        204  | typical | Content-Type header
        400  | typical | stateId parameter
        400  | typical | activityId parameter
        400  | typical | agent parameter
        204  | typical | content

Scenario: should return HTTP [HTTP] when a(n) [type] saveState request is sent with [property] set to [value]

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
        204  | typical | Content-Type header  | application/octet-stream
        204  | typical | Content-Type header  | test content type
        400  | typical | method               | POST
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

@Pending
Scenario: should return HTTP [HTTP] when a(n) [type] saveState request is sent with [property] set to [value]

    Given a [type] saveState request
    Given the [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property             | value
        400  | typical | agent parameter      | an empty agent

Scenario: should return HTTP [HTTP] when a(n) [type] saveState request is sent with the agent parameter set to a [modifier] agent with its [property] set to [value]

    Given a [type] saveState request
    Given the agent parameter is set to a [modifier] agent
    Given the params agent [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | modifier        | property         | value
        400  | typical | mboxAndType     | mbox             | test@tincan.edu
        400  | typical | mboxAndType     | mbox             | bad mbox
        400  | typical | mboxAndType     | objectType       | notAgent
        400  | typical | mboxAndType     | objectType       | Activity
        400  | typical | mboxOnly        | mbox             | test@tincan.edu
        400  | typical | mboxOnly        | mbox             | bad mbox

@Pending
Scenario: should return HTTP [HTTP] when a(n) [type] saveState request is sent with the agent parameter set to a [modifier] agent with its [property] set to [value]

    Given a [type] saveState request
    Given the agent parameter is set to a [modifier] agent
    Given the params agent [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | modifier        | property         | value
        400  | typical | mboxAndType     | objectType       | agent
        400  | typical | openidAndType   | openid           | badURI
        400  | typical | accountAndType  | account homePage | badURI
        400  | typical | openidOnly      | openid           | badURI
        400  | typical | accountOnly     | account homePage | badURI

Scenario: should return HTTP [HTTP] when a(n) [type] saveState request is sent with the agent parameter set to a [modifier] agent with its [property] removed

    Given a [type] saveState request
    Given the agent parameter is set to a [modifier] agent
    Given the params agent [property] is set to removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | modifier        | property
        400  | typical | accountAndType  | account homePage
        400  | typical | accountAndType  | account name
        400  | typical | accountOnly     | account homePage
        400  | typical | accountOnly     | account name

@Pending
Scenario: should return HTTP [HTTP] when a(n) [type] saveState request is sent with the agent parameter set to a [modifier] agent with its [property] removed

    Given a [type] saveState request
    Given the agent parameter is set to a [modifier] agent
    Given the params agent [property] is set to removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | modifier        | property
        400  | typical | mboxAndType     | mbox
