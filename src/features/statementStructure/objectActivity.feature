Feature: statement structure object activity test

Scenario: Good object activity: [modifier] activity

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

Scenario: Bad object activity: [modifier] activity with bad [property] [value]

    Given a typical saveStatement request
    Given the statement object is changed to a [modifier] activity
    Given the statement object [property] is changed to [value]
    When the request is made
    Then the LRS responds with HTTP 400

    Where:
        modifier      | property                   | value
        allProperties | id                         | bad id
        allProperties | objectType                 | notActivity
        allProperties | objectType                 | activity
        allProperties | definition type            | bad IRI
        allProperties | definition interactionType | bad interaction
        allProperties | definition moreInfo        | bad IRL

Scenario: Bad object activity: [modifier] activity missing [property]

    Given a [type] saveStatement request
    Given the statement object is changed to a [modifier] activity
    Given the statement object [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | modifier      | property
        400  | typical | allProperties | id

Scenario: Good activity definition permutation: [value] definition

    Given an activity saveStatement request
    Given the statement object definition is set to a [value] activityDefinition
    When the request is made
    Then the request was successful

    Where:
        value
        nameOnly
        descriptionOnly
        typeOnly
        moreInfoOnly
        extensionsOnly
        emptyExtensionsOnly
        allProperties
        trueFalse
        fillIn
        numeric
        other
        otherWithCorrectResponsesPattern
        choice
        sequencing
        likert
        matching
        performance
