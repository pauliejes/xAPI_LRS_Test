###
    The nature of the query priming means that all queries are necessarily
    constrained by the start and end times of the priming task so any of these
    tests may fail if either the "since" or "until" parameter is not implemented
    correctly.

    Not constraining queries by the start/end time of priming means that we can't
    do multiple runs of these tests against the same LRS without resetting the LRS
    either by voiding all statements and then skipping those statements or by
    physically clearing the data store itself which the test suite has no access
    to be able to do.
###
Feature: Good queries

Scenario: "since"/"until" parameter: from metadata

    Given a time bounded query
    When the request is made
    Then the all query is verified

Scenario: "limit" parameter: [value] ([query])

    Given a time bounded query
    Given the limit parameter is set to '[value]'
    When the request is made
    Then the [query] query is verified

    Where:
        query | value
        all   | 0

Scenario: "ascending" parameter: true

    Given a time bounded query
    Given the ascending parameter is set to 'true'
    When the request is made
    Then the allAscending query is verified

Scenario: "agent" parameter: [value] agent JSON

    Given a time bounded query
    Given the agent parameter is set to a [value] agent
    When the request is made
    Then the [query] query is verified

    Where:
        query         | value
        mboxAgent     | forQueryMbox
        mboxSha1Agent | forQueryMboxSha1

Scenario: "verb" parameter: '[value]' verb ID

    Given a time bounded query
    Given the verb parameter is set to '[value]'
    When the request is made
    Then the [query] query is verified

    Where:
        query | value
        verb  | http://tincanapi.com/conformancetest/verbid/forQuery

Scenario: "activity" parameter: '[value]' activity ID

    Given a time bounded query
    Given the activity parameter is set to '[value]'
    When the request is made
    Then the [query] query is verified

    Where:
        query    | value
        activity | http://tincanapi.com/conformancetest/activityid/forQuery

Scenario: "registration" parameter: from metadata

    Given a time bounded query
    Given the registration parameter is loaded
    When the request is made
    Then the registration query is verified

Scenario: "related_activities" parameter: true

    Given a time bounded query
    Given the activity parameter is set to 'http://tincanapi.com/conformancetest/activityid/forQuery'
    Given the related_activities parameter is set to 'true'
    When the request is made
    Then the relatedActivities query is verified

Scenario: "related_agents" parameter: true ([value] agent)

    Given a time bounded query
    Given the agent parameter is set to a [value] agent
    Given the related_agents parameter is set to 'true'
    When the request is made
    Then the [query] query is verified

    Where:
        query                | value
        mboxAgentRelated     | forQueryMbox
        mboxSha1AgentRelated | forQueryMboxSha1
