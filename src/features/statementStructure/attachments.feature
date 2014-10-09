Feature: statement structure attachments test

Scenario: Good attachments: [description]

    Given an [type] saveStatement request
    When the request is made
    Then the request was successful

    Where:
        description   | type
        plain         | attachment
        JSON          | attachmentJSON
        file URL only | attachmentFileUrlOnly

Scenario: Good attachments: with optional [property] set to [value]

    Given an attachment saveStatement request
    Given the attachment 0 body attachments 0 [property] is changed to [value]
    When the request is made
    Then the request was successful

    Where:
        property    | value
        description | languageMap content
        fileUrl     | 'http://tincanapi.com/conformancetest/fileUrl'

Scenario: Bad attachments metadata: attachment with bad [property] '[value]'

    Given an attachment saveStatement request
    Given the attachment 0 body attachments 0 [property] is changed to '[value]'
    When the request is made
    Then the LRS responds with HTTP 400

    Where:
        property    | value
        usageType   | bad type
        contentType | bad type
        display     | not a language map
        description | not a language map
        length      | not an integer
        sha2        | not a hash
        fileUrl     | bad IRL

Scenario: Bad attachments metadata: missing required property [property]

    Given an attachment saveStatement request
    Given the attachment 0 body attachments 0 [property] is removed
    When the request is made
    Then the LRS responds with HTTP 400

    Where:
        property
        usageType
        display
        contentType
        length
        sha2

Scenario: Bad attachments part: attachment with bad property [property] '[value]'

    Given an attachment saveStatement request
    Given the attachment [number] [property] is changed to '[value]'
    When the request is made
    Then the LRS responds with HTTP 400

    Where:
        number | property              | value
        0      | Content-Type          | bad type
        0      | body                  | not JSON
        0      | body                  | {"not": "a statement", "but": "JSON"}
        1      | X-Experience-API-Hash | not a matching hash

Scenario: Bad attachments part: missing required property [property]

    Given an attachment saveStatement request
    Given the attachment [number] [property] is removed
    When the request is made
    Then the LRS responds with HTTP 400

    Where:
        number | property
        0      | Content-Type
        1      | X-Experience-API-Hash
