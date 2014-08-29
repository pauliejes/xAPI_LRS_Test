Feature: saveStatement

Scenario: Good save statement: [type] request

    Given a [type] saveStatement request
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type
        200  | minimal
        204  | typical

Scenario: Bad save statement: [type] request with [property] set to '[value]'

    Given a [type] saveStatement request
    Given the [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property | value
        405  | typical | method   | POST
        400  | typical | resource | statement
        400  | minimal | method   | PUT
        400  | minimal | resource | statement

Scenario: Bad save statement: [type] request missing [property]

    Given a [type] saveStatement request
    Given the [property] is deleted
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property
        400  | typical | version header
        401  | typical | authority header
        400  | typical | Content-Type header
        400  | typical | statementId parameter
        400  | minimal | version header
        401  | minimal | authority header
        400  | minimal | Content-Type header

Scenario: Bad save statement: [type] request with bad [property] '[value]'

    Given a [type] saveStatement request
    Given the [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property              | value
        401  | typical | authority header      | bad auth
        400  | typical | version header        | 0.8.0
        400  | typical | version header        | bad version
        400  | typical | Content-Type header   | bad content type
        400  | typical | statementId parameter | bad statementId
        401  | minimal | authority header      | bad auth
        400  | minimal | version header        | 0.8.0
        400  | minimal | version header        | bad version
        400  | minimal | Content-Type header   | bad content type
        405  | minimal | statementId parameter | cebba04a-158a-4e2e-8b6d-82bav2b9c07e
        405  | minimal | statementId parameter | bad statementId
