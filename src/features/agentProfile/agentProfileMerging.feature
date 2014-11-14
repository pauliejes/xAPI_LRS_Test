Feature: Agent profile merging

Scenario: Good agent profile merging: [type] request cluster

    Given a [type] agentProfileMerging request cluster
    When the request is made on the primed LRS
    Then the agentProfileMerging response is verified

    Where:
        type
        shallow
        deep

Scenario: Bad agent profile merging: [type] request cluster

    Given a [type] agentProfileMerging request cluster
    When the request is made on the primed LRS
    Then the LRS responds with HTTP 400
    Then the agentProfileMerging response is verified

    Where:
        type
        mergeJSONWithNotJSON
        mergeNotJSONWithJSON
