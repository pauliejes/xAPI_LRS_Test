Feature: saveStatements

Scenario: should return HTTP 200 when a typical saveStatements request is made

    Given a typical saveStatements request
    When the request is made
    Then the LRS responds with HTTP 200

Scenario: should return HTTP [HTTP] when a [type] saveStatement request is made with the [prop] set to [value]

    Given a [type] saveStatements request
    Given the [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property | value
        400  | typical | method   | PUT
        400  | typical | resource | statement

Scenario: should return HTTP [HTTP] when a [type] saveStatement request is sent without a(n) [property]

    Given a [type] saveStatements request
    Given the [property] is deleted
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property
        400  | typical | version header
        401  | typical | authority header
        400  | typical | Content-Type header

Scenario: should return HTTP [HTTP] when a [type] saveStatement request is sent with the [property] set to [value]

    Given a [type] saveStatements request
    Given the [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property              | value
        200  | typical | content 1             | a typical statement
        200  | typical | content 0             | a minimal statement
        401  | typical | authority header      | bad auth
        400  | typical | version header        | 0.8.0
        400  | typical | version header        | bad version
        400  | typical | Content-Type header   | bad content type
