Feature: statement structure result test

Scenario:

    Given a [type] saveStatement request
    Given the statement result is changed to a [modifier] result
    When the request is made
    Then the request was successful

    Where:
        type    | modifier
        typical | typical
        typical | scoreOnly
        typical | successOnly
        typical | completionOnly
        typical | responseOnly
        typical | durationOnly
        typical | scoreAndSuccess
#       typical | scoreAndResponse
        typical | scoreAndDuration
        typical | successAndCompletion
#       typical | successAndResponse
        typical | successAndDuration
#       typical | completionAndResponse
        typical | completionAndDuration
        typical | responseAndDuration
        typical | scoreSuccessAndCompletion
        typical | scoreSuccessAndResponse
        typical | scoreSuccessAndDuration
        typical | scoreCompletionAndResponse
        typical | scoreResponseAndDuration
        typical | successCompletionAndResponse
        typical | successCompletionAndDuration
        typical | successResponseAndDuration
        typical | completionResponseAndDuration
        typical | scoreSuccessCompletionAndDuration
        typical | scoreSuccessCompletionAndResponse
        typical | successCompletionResponseAndDuration
        typical | allProperties

Scenario:

    Given a [type] saveStatement request
    Given the statement result is changed to a [object]
    Given the statement result [property] is changed to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                | property   | value
        400  | typical | successOnly result    | success    | not a boolean
        400  | typical | completionOnly result | completion | not a boolean
        400  | typical | allProperties result  | duration   | not ISO 8601 formatted
        400  | typical | scoreOnly result      | score      | not a score object

Scenario:

    Given a [type] saveStatement request
    Given the statement result is changed to a [object]
    Given the statement result [property] is removed
    When the request is made
    Then the request was successful

    Where:
        type    | object               | property
        typical | allProperties result | score
        typical | allProperties result | success
        typical | allProperties result | completion
        typical | allProperties result | response
        typical | allProperties result | duration
