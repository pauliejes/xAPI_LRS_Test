Feature: statement structure object test

@Pending
Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [object]
    When the request is made
    Then the request was successful

    Where:
        typical | mboxOnlyAgentActor subStatement
        typical | mboxSha1OnlyAgentActor subStatement
        typical | openidOnlyAgentActor subStatement
        typical | accountOnlyAgentActor subStatement
        typical | mboxAndTypeAgentActor subStatement
        typical | mboxSha1AndTypeAgentActor subStatement
        typical | openidAndTypeAgentActor subStatement
        typical | accountAndTypeAgentActor subStatement
        typical | mboxAndTypeGroupActor subStatement
        typical | mboxSha1AndTypeGroupActor subStatement
        typical | openidAndTypeGroupActor subStatement
        typical | accountAndTypeGroupActor subStatement
        typical | idOnlyVerb subStatement
        typical | mboxAndTypeAgentObject subStatement
        typical | mboxSha1AndTypeAgentObject subStatement
        typical | openidAndTypeAgentObject subStatement
        typical | accountAndTypeAgentObject subStatement
        typical | mboxAndTypeGroupObject subStatement
        typical | mboxSha1AndTypeGroupObject subStatement
        typical | openidAndTypeGroupObject subStatement
        typical | accountAndTypeGroupObject subStatement
        typical | allPropertiesTypicalAgentMemberGroupObject subStatement
        typical | allPropertiesActivityObject subStatement
        typical | typicalStatementRefObject subStatement
        typical | allProperties subStatement

@Pending
Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [object]
    Given the statement object [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                                                  | property                   | value
        400  | typical | allProperties subStatement                              | objectType                 | notSubStatement
        400  | typical | allProperties subStatement                              | objectType                 | subStatement
        400  | typical | mboxOnlyAgentActor subStatement                         | actor mbox                 | test@tincan.edu
        400  | typical | mboxOnlyAgentActor subStatement                         | actor mbox                 | badMbox
        400  | typical | openidOnlyAgentActor subStatement                       | actor openid               | bad openid
        400  | typical | accountOnlyAgentActor subStatement                      | actor account homePage     | bad homePage
        400  | typical | mboxAndTypeAgentActor subStatement                      | actor objectType           | notAgent
        400  | typical | mboxAndTypeAgentActor subStatement                      | actor objectType           | agent
        400  | typical | idAndDisplayVerb subStatement                           | verb id                    | bad id
        400  | typical | mboxOnlyAgentObject subStatement                        | object mbox                | test@tincan.edu
        400  | typical | mboxOnlyAgentObject subStatement                        | object mbox                | badMbox
        400  | typical | openidOnlyAgentObject subStatement                      | object openid              | bad openid
        400  | typical | accountOnlyAgentObject subStatement                     | object account homePage    | bad homePage
        400  | typical | mboxAndTypeAgentObject subStatement                     | object objectType          | notAgent
        400  | typical | mboxAndTypeAgentObject subStatement                     | objectType                 | agent
        400  | typical | allPropertiesTypicalAgentMemberGroupObject subStatement | object member 0 mbox       | test@tincan.edu
        400  | typical | allPropertiesTypicalAgentMemberGroupObject subStatement | object member 0 mbox       | bad mbox
        400  | typical | allPropertiesTypicalAgentMemberGroupObject subStatement | object member 0 objectType | notAgent
        400  | typical | allPropertiesTypicalAgentMemberGroupObject subStatement | object member 0 objectType | agent
        400  | typical | typicalStatementRefObject subStatement                  | object objectType          | statementRef
        400  | typical | typicalStatementRefObject subStatement                  | object objectType          | notStatementRef
        400  | typical | typicalStatementRefObject subStatement                  | object id                  | bad id

@Pending
Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [object]
    Given the statement object [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                                   | property
        400  | typical | mboxAndTypeAgentActor subStatement       | actor mbox
        400  | typical | mboxSha1AndTypeAgentActor subStatement   | actor mbox_sha1sum
        400  | typical | openidAndTypeAgentActor subStatement     | actor openid
        400  | typical | accountAndTypeAgentActor subStatement    | actor account
        400  | typical | accountAndTypeAgentActor subStatement    | actor account name
        400  | typical | accountAndTypeAgentActor subStatement    | actor account homePage
        400  | typical | mboxOnlyAgentActor subStatement          | actor mbox
        400  | typical | mboxSha1OnlyAgentActor subStatement      | actor mbox_sha1sum
        400  | typical | openidOnlyAgentActor subStatement        | actor openid
        400  | typical | accountOnlyAgentActor subStatement       | actor account
        400  | typical | mboxAndTypeGroupActor subStatement       | actor objectType
        400  | typical | mboxAndTypeGroupActor subStatement       | actor mbox
        400  | typical | mboxSha1AndTypeGroupActor subStatement   | actor mbox_sha1sum
        400  | typical | openidAndTypeGroupActor subStatement     | actor openid
        400  | typical | accountAndTypeGroupActor subStatement    | actor account
        400  | typical | accountAndTypeGroupActor subStatement    | actor account name
        400  | typical | accountAndTypeGroupActor subStatement    | actor account homePage
        400  | typical | idOnlyVerb subStatement                  | verb id
        400  | typical | idAndDisplayVerb subStatement            | verb id
        400  | typical | mboxAndTypeAgentObject subStatement      | object mbox
        400  | typical | mboxSha1AndTypeAgentObject subStatement  | object mbox_sha1sum
        400  | typical | openidAndTypeAgentObject subStatement    | object openid
        400  | typical | accountAndTypeAgentObject subStatement   | object account
        400  | typical | accountAndTypeAgentObject subStatement   | object account name
        400  | typical | accountAndTypeAgentObject subStatement   | object account homePage
        400  | typical | mboxOnlyAgentObject subStatement         | object mbox
        400  | typical | mboxSha1OnlyAgentObject subStatement     | object mbox_sha1sum
        400  | typical | openidOnlyAgentObject subStatement       | object openid
        400  | typical | accountOnlyAgentObject subStatement      | object account
        400  | typical | typicalStatementRefObject subStatement   | object id
        400  | typical | typicalStatementRefObject subStatement   | object objectType
        400  | typical | allPropertiesActivityObject subStatement | object id
