Feature: about

Scenario: Good about: [type] request

    Given a [type] about request
    When the request is made
    Then the LRS responds with HTTP [HTTP]
    Then the response is a valid about response

    Where:
        HTTP | type
        200  | typical
        200  | minimal

Scenario: Good about: [type] request with bad [property] '[value]'

    Given a [type] about request
    Given the [property] is set to '[value]'
    When the request is made
    Then the LRS responds with HTTP [HTTP]
    Then the response is a valid about response

    Where:
        HTTP | type    | property         | value
        200  | typical | authority header | bad auth
        200  | typical | version header   | 0.8.0
        200  | typical | version header   | bad version

Scenario: Bad about: [type] request with bad [property] '[value]'

    Given a [type] about request
    Given the [property] is set to '[value]'
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property         | value
        400  | typical | resource         | abouts
        405  | typical | method           | PUT
        405  | typical | method           | POST
        405  | typical | method           | DELETE
        405  | minimal | method           | PUT

Scenario: Good about: [type] request missing [property]

    Given a [type] about request
    Given the [property] is deleted
    When the request is made
    Then the LRS responds with HTTP [HTTP]
    Then the response is a valid about response

    Where:
        HTTP | type    | property
        200  | typical | authority header
        200  | typical | version header
