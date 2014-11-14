Feature: State concurrency

Scenario: Good state concurrency: [type] request cluster (no priming required)

    Given a [type] stateConcurrency request cluster
    When the request is made
    Then the stateConcurrency response is verified

    Where:
        type
        noneMatch

Scenario: Good state concurrency: [type] request cluster

    Given a [type] stateConcurrency request cluster
    When the request is made on the primed LRS
    Then the stateConcurrency response is verified

    Where:
        type
        correctMatch
        correctMatchWithRegistration

Scenario: Bad state concurrency: [type] request cluster

    Given a [type] stateConcurrency request cluster
    When the request is made on the primed LRS
    Then the LRS responds with HTTP 412
    Then the stateConcurrency response is verified

    Where:
        type
        incorrectNoneMatch
        incorrectMatch
        ifMatchAndIfNoneMatch
