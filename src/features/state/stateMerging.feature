Feature: State merging

Scenario: Good state merging: [type] request cluster

    Given a [type] stateMerging request cluster
    When the request is made on the primed LRS
    Then the stateMerging response is verified

    Where:
        type
        shallow
        deep
        mergeWithRegistration

Scenario: Bad state merging: [type] request cluster

    Given a [type] stateMerging request cluster
    When the request is made on the primed LRS
    Then the LRS responds with HTTP 400
    Then the stateMerging response is verified

    Where:
        type
        mergeJSONWithNotJSON
        mergeNotJSONWithJSON
