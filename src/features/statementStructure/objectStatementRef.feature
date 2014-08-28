Feature: statement structure statementRef test

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [object]
    When the request is made
    Then the request was successful

    Where:
        type    | object
        typical | allProperties statementRef

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [object]
    Given the statement object [property] is changed to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                                | property                  | value
        400  | typical | allProperties statementRef            | objectType                | notStatementRef
        400  | typical | allProperties statementRef            | id                        | bad id
        400  | typical | allProperties statementRef            | objectType                | statementRef

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [object]
    Given the statement object [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                             | property
        400  | typical | allProperties statementRef         | id
        400  | typical | allProperties statementRef         | objectType
