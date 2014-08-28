Feature: deleteState

Scenario:

    Given a [type] deleteState request cluster
    When the request is made on the primed LRS
    Then the deleteState response is verified

    Where:
        type
        typical

Scenario:

    Given a [type] deleteState request cluster
    Given all requests' [property] are set to [value]
    When the request is made on the primed LRS
    Then the deleteState response is verified

    Where:
        type             | property             | value
        typical          | stateId parameter    | test state id
        typical          | activityId parameter | test activity id
        typical          | agent parameter      | an mboxAndType agent
        typical          | agent parameter      | an mboxSha1AndType agent
        typical          | agent parameter      | an openidAndType agent
        typical          | agent parameter      | an accountAndType agent
        typical          | agent parameter      | an mboxOnly agent
        typical          | agent parameter      | an mboxSha1Only agent
        typical          | agent parameter      | an openidOnly agent
        typical          | agent parameter      | an accountOnly agent
        withRegistration | stateId parameter    | test state id
        withRegistration | activityId parameter | test activity id
        withRegistration | agent parameter      | an mboxAndType agent
        withRegistration | agent parameter      | an mboxSha1AndType agent
        withRegistration | agent parameter      | an openidAndType agent
        withRegistration | agent parameter      | an accountAndType agent
        withRegistration | agent parameter      | an mboxOnly agent
        withRegistration | agent parameter      | an mboxSha1Only agent
        withRegistration | agent parameter      | an openidOnly agent
        withRegistration | agent parameter      | an accountOnly agent

Scenario:

    Given a [type] deleteState request
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

Scenario:

    Given a [type] deleteState request
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

Scenario:

    Given a [type] deleteState request
    Given the agent parameter is set to a [modifier] agent
    Given the params agent [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | modifier       | property         | value
        400  | typical | mboxAndType    | mbox             | test@tincan.edu
        400  | typical | mboxAndType    | mbox             | bad mbox
        400  | typical | mboxAndType    | objectType       | notAgent
        400  | typical | mboxAndType    | objectType       | Activity
        400  | typical | mboxOnly       | mbox             | test@tincan.edu
        400  | typical | mboxOnly       | mbox             | bad mbox
        400  | typical | mboxAndType    | objectType       | agent
        400  | typical | openidAndType  | openid           | badURI
        400  | typical | accountAndType | account homePage | badURI
        400  | typical | openidOnly     | openid           | badURI
        400  | typical | accountOnly    | account homePage | badURI


Scenario:

    Given a [type] deleteState request
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
