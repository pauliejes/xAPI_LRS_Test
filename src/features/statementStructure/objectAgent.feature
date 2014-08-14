Feature: statement structure object agent test

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [object]
    When the request is made
    Then the request was successful

    Where:
        type    | object
        typical | mboxAndType agent
        typical | mboxSha1AndType agent
        typical | openidAndType agent
        typical | accountAndType agent

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [object]
    Given the statement object [property] is changed to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                                | property                  | value
        400  | typical | mboxAndType agent                     | mbox                      | test@tincan.edu
        400  | typical | mboxAndType agent                     | mbox                      | bad mbox
        400  | typical | mboxAndType agent                     | objectType                | notAgent

@Pending
Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [object]
    Given the statement object [property] is set to [value]
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                                                  | property                   | value
        400  | typical | openidAndType agent                                     | openid                     | bad openid
        400  | typical | mboxAndType agent                                       | objectType                 | agent
        400  | typical | accountAndType agent                                    | account homePage           | bad homePage

Scenario:

    Given a [type] saveStatement request
    Given the statement object is changed to a [object]
    Given the statement object [property] is removed
    When the request is made
    Then the LRS responds with HTTP [HTTP]

    Where:
        HTTP | type    | object                             | property
        400  | typical | mboxAndType agent                  | mbox
        400  | typical | mboxSha1AndType agent              | mbox_sha1sum
        400  | typical | openidAndType agent                | openid
        400  | typical | accountAndType agent               | account
        400  | typical | accountAndType agent               | account name
        400  | typical | accountAndType agent               | account homePage
        400  | typical | mboxOnly agent                     | mbox
        400  | typical | mboxSha1Only agent                 | mbox_sha1sum
        400  | typical | openidOnly agent                   | openid
        400  | typical | accountOnly agent                  | account
