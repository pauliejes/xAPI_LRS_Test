Feature: statement structure context test

Scenario:

    Given a [type] saveStatement request
    Given the statement context is changed to a [modifier] context
    When the request is made
    Then the request was successful

    Where:
        type    | modifier
        typical | typical
        typical | mboxAndTypeAgentInstructor
        typical | mboxSha1AndTypeAgentInstructor
        typical | openidAndTypeAgentInstructor
        typical | accountAndTypeAgentInstructor
        typical | allProperties

Scenario:

    Given a [type] saveStatement request
    Given the statement context is changed to a [object]
    Given the statement context [property] is changed to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                             | property                                | value
        400  | typical | allProperties context              | registration                            | bad id
        400  | typical | allProperties context              | instructor                              | notAnAgent
        400  | typical | mboxAndTypeAgentInstructor context | instructor mbox                         | test@tincan.edu
        400  | typical | mboxAndTypeAgentInstructor context | instructor mbox                         | bad mbox
        400  | typical | mboxAndTypeAgentInstructor context | instructor objectType                   | notAgent
        400  | typical | allProperties context              | team objectType                         | notAGroup
        400  | typical | allProperties context              | team mbox                               | test@tincan.edu
        400  | typical | allProperties context              | team mbox                               | bad mbox
        400  | typical | allProperties context              | language                                | bad language
        400  | typical | allProperties context              | statement id                            | bad id
        400  | typical | allProperties context              | statement objecType                     | notStatementRef

@Pending
Scenario:

    Given a [type] saveStatement request
    Given the statement context is changed to a [object]
    Given the statement context [property] is changed to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                                | property                                | value
        400  | typical | openidAndTypeAgentInstructor context  | instructor openid                       | bad openid
        400  | typical | accountAndTypeAgentInstructor context | instructor account homePage             | bad homePage
        400  | typical | allProperties context                 | instructor objectType                   | agent
        400  | typical | allProperties context                 | team objectType                         | group
        400  | typical | allProperties context                 | contextActivities category 0 objectType | notActivity
        400  | typical | allProperties context                 | contextActivities parent 0 objectType   | notActivity
        400  | typical | allProperties context                 | contextActivities grouping 0 objectType | notActivity
        400  | typical | allProperties context                 | contextActivities other 0 objectType    | notActivity
        400  | typical | allProperties context                 | statement objectType                    | statementRef
        400  | typical | allProperties context                 | contextActivities category 0 id         | bad id
        400  | typical | allProperties context                 | contextActivities parent 0 id           | bad id
        400  | typical | allProperties context                 | contextActivities grouping 0 id         | bad id
        400  | typical | allProperties context                 | contextActivities other 0 id            | bad id
        400  | typical | allProperties context                 | contextActivities category 0 objectType | notActivity
        400  | typical | allProperties context                 | contextActivities parent 0 objectType   | notActivity
        400  | typical | allProperties context                 | contextActivities grouping 0 objectType | notActivity
        400  | typical | allProperties context                 | contextActivities other 0 objectType    | notActivity

Scenario:

    Given a [type] saveStatement request
    Given the statement context is changed to a [object]
    Given the statement context [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                                 | property
        400  | typical | mboxAndTypeAgentInstructor context     | instructor mbox
        400  | typical | mboxSha1AndTypeAgentInstructor context | instructor mbox_sha1sum
        400  | typical | openidAndTypeAgentInstructor context   | instructor openid
        400  | typical | accountAndTypeAgentInstructor context  | instructor account
        400  | typical | accountAndTypeAgentInstructor context  | instructor account name
        400  | typical | accountAndTypeAgentInstructor context  | instructor account homePage
        400  | typical | allProperties context                  | team mbox
        204  | typical | allProperties context                  | team objectType
        400  | typical | allProperties context                  | statement id
        204  | typical | allProperties context                  | statement objectType

@Pending
Scenario:

    Given a [type] saveStatement request
    Given the statement context is changed to a [object]
    Given the statement context [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                                 | property
        400  | typical | allProperties context                  | contextActivities category 0 id
        400  | typical | allProperties context                  | contextActivities parent 0 id
        400  | typical | allProperties context                  | contextActivities grouping 0 id
        400  | typical | allProperties context                  | contextActivities other 0 id
        400  | typical | allProperties context                  | contextActivities category 0 objectType
        400  | typical | allProperties context                  | contextActivities parent 0 objectType
        400  | typical | allProperties context                  | contextActivities grouping 0 objectType
        400  | typical | allProperties context                  | contextActivities other 0 objectType
