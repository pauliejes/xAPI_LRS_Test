Feature: retrieveStateIds

Scenario: Good retrieve state ids: [type] request cluster

    Given a [type] retrieveStateIds request cluster
    When the request is made on the primed LRS
    Then the retrieveStateIds response is verified

    Where:
        type
        typical
        withRegistration

Scenario: Good retrieve state ids: [type] request cluster with a [modifier] agent parameter

    Given a [type] retrieveStateIds request cluster
    Given all requests' agent parameter is set to an [modifier] agent
    When the request is made on the primed LRS
    Then the retrieveState response is verified

    Where:
        type             | modifier
        typical          | mboxAndType
        typical          | mboxSha1AndType
        typical          | openidAndType
        typical          | accountAndType
        typical          | mboxOnly
        typical          | mboxSha1Only
        typical          | openidOnly
        typical          | accountOnly
        withRegistration | mboxAndType
        withRegistration | mboxSha1AndType
        withRegistration | openidAndType
        withRegistration | accountAndType
        withRegistration | mboxOnly
        withRegistration | mboxSha1Only
        withRegistration | openidOnly
        withRegistration | accountOnly

Scenario: Bad retrieve state ids: [type] request missing [property]

    Given a [type] retrieveStateIds request
    Given the [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type             | property
        400  | typical          | version header
        401  | typical          | authority header
        400  | typical          | activityId parameter
        400  | typical          | agent parameter
        400  | withRegistration | version header
        401  | withRegistration | authority header
        400  | withRegistration | activityId parameter
        400  | withRegistration | agent parameter

Scenario: Bad retrieve state ids: [type] request with bad [property] '[value]'

    Given a [type] retrieveStateIds request
    Given the [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property         | value
        400  | typical | resource         | activity/state
        400  | typical | resource         | activities/states
        400  | typical | version header   | bad version
        400  | typical | version header   | 3.8.0
        400  | typical | authority header | Basic badAuth
        401  | typical | authority header | Basic TnsHNWplME1YZnc0VzdLTHRIWTo0aDdBb253Ml85WU53vSZLNlVZ
        400  | typical | agent parameter  | an empty agent

Scenario: Bad retrieve state ids: [type] request with [modifier] agent parameter with bad [property] '[value]'

    Given a [type] retrieveStateIds request
    Given the agent parameter is set to a [modifier] agent
    Given the params agent [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | modifier       | property         | value
        400  | typical | mboxAndType    | mbox             | conformancetest@tincanapi.com
        400  | typical | mboxAndType    | mbox             | bad mbox
        400  | typical | mboxAndType    | objectType       | notAgent
        400  | typical | mboxAndType    | objectType       | Activity
        400  | typical | mboxOnly       | mbox             | conformancetest@tincanapi.com
        400  | typical | mboxOnly       | mbox             | bad mbox
        400  | typical | mboxAndType    | objectType       | agent
        400  | typical | openidAndType  | openid           | badURI
        400  | typical | accountAndType | account homePage | badURI
        400  | typical | openidOnly     | openid           | badURI
        400  | typical | accountOnly    | account homePage | badURI

Scenario: Bad retrieve state ids: [type] request with [modifier] agent parameter missing [property]

    Given a [type] retrieveStateIds request
    Given the agent parameter is set to a [modifier] agent
    Given the params agent [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | modifier       | property
        400  | typical | accountAndType | account homePage
        400  | typical | accountAndType | account name
        400  | typical | accountOnly    | account homePage
        400  | typical | accountOnly    | account name
        400  | typical | mboxAndType    | mbox
