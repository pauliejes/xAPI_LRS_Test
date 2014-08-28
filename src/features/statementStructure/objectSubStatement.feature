Feature: statement structure object substatement test

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [value] subStatement
    When the request is made
    Then the request was successful

    Where:
        type    | value
        typical | mboxOnlyAgentActor
        typical | mboxSha1OnlyAgentActor
        typical | openidOnlyAgentActor
        typical | accountOnlyAgentActor
        typical | mboxAndTypeAgentActor
        typical | mboxSha1AndTypeAgentActor
        typical | openidAndTypeAgentActor
        typical | accountAndTypeAgentActor
        typical | mboxAndTypeGroupActor
        typical | mboxSha1AndTypeGroupActor
        typical | openidAndTypeGroupActor
        typical | accountAndTypeGroupActor
        typical | idOnlyVerb
        typical | mboxAndTypeAgentObject
        typical | mboxSha1AndTypeAgentObject
        typical | openidAndTypeAgentObject
        typical | accountAndTypeAgentObject
        typical | mboxAndTypeGroupObject
        typical | mboxSha1AndTypeGroupObject
        typical | openidAndTypeGroupObject
        typical | accountAndTypeGroupObject
        typical | allPropertiesTypicalAgentMemberGroupObject
        typical | allPropertiesActivityObject
        typical | typicalStatementRefObject
        typical | allProperties

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [kind] subStatement
    Given the statement object [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | kind                                       | property                   | value
        400  | typical | allProperties                              | objectType                 | notSubStatement
        400  | typical | allProperties                              | objectType                 | subStatement
        400  | typical | mboxOnlyAgentActor                         | actor mbox                 | test@tincan.edu
        400  | typical | mboxOnlyAgentActor                         | actor mbox                 | badMbox
        400  | typical | openidOnlyAgentActor                       | actor openid               | bad openid
        400  | typical | accountOnlyAgentActor                      | actor account homePage     | bad homePage
        400  | typical | mboxAndTypeAgentActor                      | actor objectType           | notAgent
        400  | typical | mboxAndTypeAgentActor                      | actor objectType           | agent
        400  | typical | typical                                    | verb id                    | bad id
        400  | typical | mboxOnlyAgentObject                        | object mbox                | test@tincan.edu
        400  | typical | mboxOnlyAgentObject                        | object mbox                | badMbox
        400  | typical | openidOnlyAgentObject                      | object openid              | bad openid
        400  | typical | accountOnlyAgentObject                     | object account homePage    | bad homePage
        400  | typical | mboxAndTypeAgentObject                     | object objectType          | notAgent
        400  | typical | mboxAndTypeAgentObject                     | objectType                 | agent
        400  | typical | allPropertiesTypicalAgentMemberGroupObject | object member 0 mbox       | test@tincan.edu
        400  | typical | allPropertiesTypicalAgentMemberGroupObject | object member 0 mbox       | bad mbox
        400  | typical | allPropertiesTypicalAgentMemberGroupObject | object member 0 objectType | notAgent
        400  | typical | allPropertiesTypicalAgentMemberGroupObject | object member 0 objectType | agent
        400  | typical | typicalStatementRefObject                  | object objectType          | statementRef
        400  | typical | typicalStatementRefObject                  | object objectType          | notStatementRef
        400  | typical | typicalStatementRefObject                  | object id                  | bad id

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [kind] subStatement
    Given the statement object [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | kind                        | property
        400  | typical | mboxAndTypeAgentActor       | actor mbox
        400  | typical | mboxSha1AndTypeAgentActor   | actor mbox_sha1sum
        400  | typical | openidAndTypeAgentActor     | actor openid
        400  | typical | accountAndTypeAgentActor    | actor account
        400  | typical | accountAndTypeAgentActor    | actor account name
        400  | typical | accountAndTypeAgentActor    | actor account homePage
        400  | typical | mboxOnlyAgentActor          | actor mbox
        400  | typical | mboxSha1OnlyAgentActor      | actor mbox_sha1sum
        400  | typical | openidOnlyAgentActor        | actor openid
        400  | typical | accountOnlyAgentActor       | actor account
        400  | typical | mboxAndTypeGroupActor       | actor objectType
        400  | typical | mboxAndTypeGroupActor       | actor mbox
        400  | typical | mboxSha1AndTypeGroupActor   | actor mbox_sha1sum
        400  | typical | openidAndTypeGroupActor     | actor openid
        400  | typical | accountAndTypeGroupActor    | actor account
        400  | typical | accountAndTypeGroupActor    | actor account name
        400  | typical | accountAndTypeGroupActor    | actor account homePage
        400  | typical | typical                     | verb id
        400  | typical | mboxAndTypeAgentObject      | object mbox
        400  | typical | mboxSha1AndTypeAgentObject  | object mbox_sha1sum
        400  | typical | openidAndTypeAgentObject    | object openid
        400  | typical | accountAndTypeAgentObject   | object account
        400  | typical | accountAndTypeAgentObject   | object account name
        400  | typical | accountAndTypeAgentObject   | object account homePage
        400  | typical | mboxOnlyAgentObject         | object mbox
        400  | typical | mboxSha1OnlyAgentObject     | object mbox_sha1sum
        400  | typical | openidOnlyAgentObject       | object openid
        400  | typical | accountOnlyAgentObject      | object account
        400  | typical | typicalStatementRefObject   | object id
        400  | typical | typicalStatementRefObject   | object objectType
        400  | typical | allPropertiesActivityObject | object id
