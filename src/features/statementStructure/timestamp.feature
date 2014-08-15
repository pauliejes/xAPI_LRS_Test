Feature: statement structure timestamp test

Scenario:

    Given a typical saveStatement request
    Given the statement timestamp is changed to 2014-07-23T12:34:02-05:00
    When the request is made
    Then the request was successful

Scenario:

    Given a [type] saveStatement request
    Given the statement timestamp is changed to [object]
    When the request is made
    Then the request was successful

    Where:
        HTTP | type    | object
        204  | typical | 2014-07-23T12:34:02Z
        204  | typical | 2014-07-23T12:34:02+00
        204  | typical | 2014-07-23T12:34:02.365-05:00
        204  | typical | 2014-07-23T12:34:02.36578-5:00

Scenario:

    Given a [type] saveStatement request
    Given the statement timestamp is changed to [object]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object
        400  | typical | bad timestamp

@Pending
Scenario:

    Given a [type] saveStatement request
    Given the statement timestamp is changed to [object]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object
        400  | typical | 2014-07-23T12:34:02-00
        400  | typical | 2214-07-23T12:34:02-05:00

Scenario:

    Given a typical saveStatement request
    Given the statement timestamp is removed
    When the request is made
    Then the request was successful
