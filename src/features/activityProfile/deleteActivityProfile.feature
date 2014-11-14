Feature: Delete activity profile

Scenario: Good delete activityProfile: typical request cluster

    Given a typical deleteActivityProfile request cluster
    When the request is made on the primed LRS
    Then the deleteActivityProfile response is verified

Scenario: Bad delete activityProfile: [type] request missing [property]

    Given a [type] deleteActivityProfile request
    Given the [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property
        401  | typical | authority header
        400  | typical | activityId parameter
        400  | typical | profileId parameter

# Pending because it will pass in 0.9 enabled LRSs, need to detect those and annotate accordingly
@Pending
Scenario: Bad delete activityProfile: typical request missing version header

    Given a typical deleteActivityProfile request
    Given the version header is removed
    When the request is made
    Then the LRS responds with HTTP 400

Scenario: Bad delete state: [type] request with  bad [property] '[value]'

    Given a [type] deleteActivityProfile request
    Given the [property] is set to '[value]'
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | property             | value
        400  | typical | resource             | activity/profile
        400  | typical | resource             | activities/profiles
        405  | typical | resource             | activities
        400  | typical | version header       | bad version
        400  | typical | version header       | 3.8.0
        400  | typical | authority header     | Basic badAuth
        401  | typical | authority header     | Basic TnsHNWplME1YZnc0VzdLTHRIWTo0aDdBb253Ml85WU53vSZLNlVZ
        400  | typical | activityId parameter | bad URI
