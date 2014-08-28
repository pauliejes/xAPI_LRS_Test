Feature: about

Scenario: should return HTTP [HTTP] when a(n) [type] about request is sent

    Given a [type] about request
    When the request is made
    Then the LRS responds with HTTP [HTTP]
    Then the response is a valid about response

    Where:
        HTTP | type
        200  | typical
        200  | minimal

Scenario: should return HTTP [HTTP] a [type] about request is sent with the [property] is set to [value]

    Given a [type] about request
    Given the [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]
    Then the response is a valid about response

    Where:
        HTTP | type    | property         | value
        400  | typical | resource         | abouts
        200  | typical | authority header | bad auth
        200  | typical | version header   | 0.8.0
        200  | typical | version header   | bad version

Scenario: should return HTTP [HTTP] a [type] about request is sent with the [property] is set to [value]

    Given a [type] about request
    Given the [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]
    Then the response is a valid about response

    Where:
        HTTP | type    | property         | value
        405  | typical | method           | PUT
        405  | typical | method           | POST
        405  | typical | method           | DELETE
        405  | minimal | method           | PUT

Scenario: should return HTTP [HTTP] when a(n) [type] about request is sent without a(n) [property]

    Given a [type] about request
    Given the [property] is deleted
    When the request is made
    Then the LRS responds with HTTP [HTTP]
    Then the response is a valid about response

    Where:
        HTTP | type    | property
        200  | typical | authority header
        200  | typical | version header
