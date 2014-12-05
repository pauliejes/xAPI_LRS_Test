Feature: Actor Conflicts

Scenario: Testing: [testName] Conflict

    Given the control statementId saveStatement request
    Given the statement actor is set to an [value]
    When the request is made
    Then the actor [testName] conflicting statement is sent successfully

    Where:
        testName                                 | value
        AgentMboxSha1AndType                     | mboxSha1AndType agent
        AgentOpenIdAndType                       | openidAndType agent
        AgentAccountAndType                      | accountAndType agent
        AgentMboxOnly                            | mboxOnly agent
        AgentMboxSha1Only                        | mboxSha1Only agent
        AgentOpenIdOnly                          | openidOnly agent
        AgentAccountOnly                         | accountOnly agent
        GroupMboxAndtype                         | mboxAndType group
        GroupMboxSha1AndType                     | mboxSha1AndType group
        GroupOpenIdAndTpe                        | openidAndType group
        GroupAccountAndType                      | accountAndType group
        GroupMboxTypeAndName                     | mboxTypeAndName group
        GroupMboxSha1TypeAndName                 | mboxSha1TypeAndName group
        GroupOpenIdTypeAndName                   | openidTypeAndName group
        GroupAccountTypeAndName                  | accountTypeAndName group
        GroupMboxTypeAndMember                   | mboxTypeAndMember group
        GroupMboxSha1TypeAndMember               | mboxSha1TypeAndMember group
        GroupOpenIdTypeAndMember                 | openidTypeAndMember group
        GroupAccountTypeAndMember                | accountTypeAndMember group
        GroupAllPropertiesTypicalAgentMember     | allPropertiesTypicalAgentMember group
        GroupAllPropertiesMboxAgentMember        | allPropertiesMboxAgentMember group
        GroupAllPropertiesMboxSha1AgentMember    | allPropertiesMboxSha1AgentMember group
        GroupAllPropertiesOpenIdAgentMember      | allPropertiesOpenidAgentMember group
        GroupAllPropertiesAccountAgentMember     | allPropertiesAccountAgentMember group
        GroupAllPropertiesTwoTypicalAgentsMember | allPropertiesTwoTypicalAgentsMember group
