Feature: statement structure object activity test

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [object]
    When the request is made
    Then the request was successful

    Where:
        type    | object
        typical | allProperties activity

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [object]
    Given the statement object [property] is changed to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                                | property                  | value
        400  | typical | allProperties activity                | id                        | bad id
        400  | typical | allProperties activity                | objectType                | notActivity

@Pending
Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [object]
    Given the statement object [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                                                  | property                   | value
        400  | typical | allProperties activity                                  | objectType                 | activity

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [object]
    Given the statement object [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                             | property
        204  | typical | allProperties activity             | objectType
        400  | typical | allProperties activity             | id
