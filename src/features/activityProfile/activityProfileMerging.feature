Feature: Activity profile merging

Scenario: Good activity profile merging: [type] request cluster

    Given a [type] activityProfileMerging request cluster
    When the request is made on the primed LRS
    Then the activityProfileMerging response is verified

    Where:
        type
        shallow
        deep

Scenario: Bad activity profile merging: [type] request cluster

    Given a [type] activityProfileMerging request cluster
    When the request is made on the primed LRS
    Then the LRS responds with HTTP 400
    Then the activityProfileMerging response is verified

    Where:
        type
        mergeJSONWithNotJSON
        mergeNotJSONWithJSON
