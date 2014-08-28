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
    Given the statement context is changed to a [kind] context
    Given the statement context [property] is changed to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | kind                          | property                                | value
        400  | typical | allProperties                 | registration                            | bad id
        400  | typical | allProperties                 | instructor                              | notAnAgent
        400  | typical | mboxAndTypeAgentInstructor    | instructor mbox                         | conformancetest@tincanapi.com
        400  | typical | mboxAndTypeAgentInstructor    | instructor mbox                         | bad mbox
        400  | typical | mboxAndTypeAgentInstructor    | instructor objectType                   | notAgent
        400  | typical | allProperties                 | team objectType                         | notAGroup
        400  | typical | allProperties                 | team mbox                               | conformancetest@tincanapi.com
        400  | typical | allProperties                 | team mbox                               | bad mbox
        400  | typical | allProperties                 | language                                | bad language
        400  | typical | allProperties                 | statement id                            | bad id
        400  | typical | allProperties                 | statement objecType                     | notStatementRef
        400  | typical | openidAndTypeAgentInstructor  | instructor openid                       | bad openid
        400  | typical | accountAndTypeAgentInstructor | instructor account homePage             | bad homePage
        400  | typical | allProperties                 | instructor objectType                   | agent
        400  | typical | allProperties                 | team objectType                         | group
        400  | typical | allProperties                 | contextActivities category 0 objectType | notActivity
        400  | typical | allProperties                 | contextActivities parent 0 objectType   | notActivity
        400  | typical | allProperties                 | contextActivities grouping 0 objectType | notActivity
        400  | typical | allProperties                 | contextActivities other 0 objectType    | notActivity
        400  | typical | allProperties                 | statement objectType                    | statementRef
        400  | typical | allProperties                 | contextActivities category 0 id         | bad id
        400  | typical | allProperties                 | contextActivities parent 0 id           | bad id
        400  | typical | allProperties                 | contextActivities grouping 0 id         | bad id
        400  | typical | allProperties                 | contextActivities other 0 id            | bad id
        400  | typical | allProperties                 | contextActivities category 0 objectType | activity
        400  | typical | allProperties                 | contextActivities parent 0 objectType   | activity
        400  | typical | allProperties                 | contextActivities grouping 0 objectType | activity
        400  | typical | allProperties                 | contextActivities other 0 objectType    | activity

Scenario:

    Given a [type] saveStatement request
    Given the statement context is changed to a [kind] context
    Given the statement context [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | kind                           | property
        400  | typical | mboxAndTypeAgentInstructor     | instructor mbox
        400  | typical | mboxSha1AndTypeAgentInstructor | instructor mbox_sha1sum
        400  | typical | openidAndTypeAgentInstructor   | instructor openid
        400  | typical | accountAndTypeAgentInstructor  | instructor account
        400  | typical | accountAndTypeAgentInstructor  | instructor account name
        400  | typical | accountAndTypeAgentInstructor  | instructor account homePage
        400  | typical | allProperties                  | team mbox
        400  | typical | allProperties                  | statement id

Scenario:

    Given a [type] saveStatement request
    Given the statement context is changed to a [kind] context
    Given the statement context [property] is removed
    When the request is made
    Then the request was successful

    Where:
        type    | kind          | property
        typical | allProperties | team objectType
        typical | allProperties | statement objectType

Scenario:

    Given a [type] saveStatement request
    Given the statement context is changed to a [kind] context
    Given the statement context [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | kind          | property
        400  | typical | allProperties | contextActivities category 0 id
        400  | typical | allProperties | contextActivities parent 0 id
        400  | typical | allProperties | contextActivities grouping 0 id
        400  | typical | allProperties | contextActivities other 0 id

Scenario:

    Given a [type] saveStatement request
    Given the statement context is changed to a [kind] context
    Given the statement context [property] is removed
    When the request is made
    Then the request was successful

    Where:
        type    | kind          | property
        typical | allProperties | contextActivities category 0 objectType
        typical | allProperties | contextActivities parent 0 objectType
        typical | allProperties | contextActivities grouping 0 objectType
        typical | allProperties | contextActivities other 0 objectType
