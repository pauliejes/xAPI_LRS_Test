Feature: statement structure object activity test

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [modifier] activity
    When the request is made
    Then the request was successful

    Where:
        type    | modifier
        typical | idOnly
        typical | idAndObjectType
        typical | idAndDefinition
        typical | allProperties

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [modifier] activity
    Given the statement object [property] is changed to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | modifier      | property   | value
        400  | typical | allProperties | id         | bad id
        400  | typical | allProperties | objectType | notActivity
        400  | typical | allProperties | objectType | activity

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [modifier] activity
    Given the statement object [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | modifier      | property
        400  | typical | allProperties | id

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [modifier] activity
    Given the statement object [property] is removed
    When the request is made
    Then the request was successful

    Where:
        type    | modifier      | property
        typical | allProperties | objectType
