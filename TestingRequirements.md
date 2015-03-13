# Experience API
## Advanced Distributed Learning (ADL) Co-Laboratories

>"Copyright 2013 Advanced Distributed Learning (ADL) Initiative, U.S. Department of Defense

>Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except 
>in compliance with the License. You may obtain a copy of the License at
>http://www.apache.org/licenses/LICENSE-2.0

>Unless required by applicable law or agreed to in writing, software distributed under the License 
>is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express 
>or implied. See the License for the specific language governing permissions and limitations under 
>the License."

>This document was authored by members of the Experience API Working Group (see 
>list on pp. 7-8) in support of the Office of the Deputy Assistant Secretary of 
>Defense (Readiness) Advanced Distributed Learning (ADL) Initiative. Please 
>send all feedback and inquiries to helpdesk@adlnet.gov  


## 1.0 Conformance Requirements Properties

### Background  

This effort was started in conjunction with the 1.0.1 release of the specification.  As a result of community efforts, some requirements changed as we reached version 1.0.2.  1.0.2 is the version that will be used for this Conformance Testing Requirements document.  Please consider this when using the document to map requirements.


### Requirements  

All requirements in this document are treated as MUSTs for conformance.  "If clauses" will be present in the case of conditional requirements.  If the condition is not met, this document makes no assertion of the rest of the requirement.  Every requirement in this document is self contained, no context can be inferred from other requirements in the document, even if in close proximity.  Thus, a requirement on "objectType" refers to all instances of "objectType", even if it appears near "actor" requirements.

### Tagging Types

Each requirement should take on one of the following types:

* Vocabulary - A specific string is expected
* Multiplicity - A certain number of an element or parameter is expected
* Type - A certain data type is expected
* Syntax - A certain format to the data is expected
* Structure - A certain order or hierarchy is expected
* Modify - An expected change based on inputs


### Tagging Syntax

Eventually every requirement will be numbered, but with this document in a state of fluctuation, we will finalize the list structure before assigning identifiers.  All properties and vocabulary specifically named should be in double quotes.

### Tagging References

All requirements will be tagged in this document by reference.  The reference will begin with the numeric section in the Experience API Version 1.0.1 Document in which it was found.  It will then use lower case letters to indicate which bullet within that section the requirement came from.  In the event there are more than 26 requirements in a single section, double lower-case letters may be used - aa, ab, ac, etc.  References that are not within a bullet will refer to .table#row#.lowercaseletter or .paragraph#sentence#.lowercaseletter.  External references should be marked with the requirement name (such as RFC 4122)

### Explicit Vs. Implicit

Each requirement will be tagged with a reference to the Experience API v1.0.1 specification.  If this reference contains a "MUST", it is explicit and will not be marked further.  If the requirement is assumed to be MUST because no other possibility exists or the spec itself isn't explicit, the requirement will be marked as **Implicit**.

### Assertion

In the event a requirement has been deemed necessary to add to this document, but has no current grounding in the xAPI Specification document, it shall be marked as "assert" and should have an accompanying issue in GitHub.  Resolution will take the form of a future change to the spec itself or removal of this requirement.

### Special Verbs
All requirements should follow the same basic verbs, some verbs, however, will require specific behavior.

* Rejects - Must be accompanied with an error code
* Is Defined By - Allows the definition of a new term to increase readability of requirements.  The definition 
links to a document section.  A specific requirement is not necessary.  Being "defined" doesn't remove any previous requirements i.e. an "Agent" is still either an "actor" property or "object" property.

### LRS vs. "System"

In the xAPI Specification, there are references to the Learning Record Store (LRS) as well as to a generic "system".  The LRS is not considered to be one of these systems for the sake of conformance as the LRS simply stores and retrieves statements, whereas "systems" referenced within the xAPI Specification are expected to perform either an additional task or a different task.  Requirements with MUST or MUST NOT that relate to systems will not be vetted in this document.  A similar case can be made for other non-LRS entities such as "Anyone".


<a name="creqprop"/>
## 2.0 Conformance Requirements

#### Definitions

* An IRL is defined by taking on the form of a URL, but allowing the characters of an IRI

### 2.1 Statement Requirements  

###### Details
The details of each property of a statement are described in the table below. 


* All Objects are well-created JSON Objects (Nature of binding) **Implicit**
* All Strings are encoded and interpreted as UTF-8 (6.1.a)
* All UUID types follow requirements of RFC4122 (Type, 4.1.1)
* All UUID types are in standard String form (Type, 4.1.1)
* A TimeStamp is defined as a Date/Time formatted according to ISO 8601 (Format, ISO8601)
* A Statement uses the "id" property at most one time (Multiplicity, 4.1.a)
* A Statement uses the "actor" property at most one time (Multiplicity, 4.1.a)
* A Statement uses the "verb" property at most one time (Multiplicity, 4.1.a)
* A Statement uses the "object" property at most one time (Multiplicity, 4.1.a)
* A Statement uses the "result" property at most one time (Multiplicity, 4.1.a)
* A Statement uses the "context" property at most one time (Multiplicity, 4.1.a)
* A Statement uses the "timestamp" property at most one time (Multiplicity, 4.1.a)
* A Statement uses the "stored" property at most one time (Multiplicity, 4.1.a)
* A Statement uses the "authority" property at most one time (Multiplicity, 4.1.a)
* A Statement uses the "version" property at most one time (Multiplicity, 4.1.a)
* A Statement uses the "attachments" property at most one time (Multiplicity, 4.1.a)
* A Statement contains an "actor" property (Multiplicity, 4.1.b)
* A Statement contains a "verb" property (Multiplicity, 4.1.b)
* A Statement contains an "object" property (Multiplicity, 4.1.b)
* A Statement's "id" property is a String (Type, 4.1.1.description.a)
* A Statement's "id" property is a UUID following RFC 4122 (Syntax, RFC 4122)
* An "actor" property uses the "objectType" property at most one time (Multiplicity, 4.1.a)
* An "objectType" property is a String (Type, 4.1.2.1.table1.row1.a)
* An "actor" property's "objectType" property is either "Agent" or "Group" (Vocabulary, 4.1.2.1.table1.row1.b, 4.1.2.1.table1.row1.b)
* An Agent is defined by "objectType" of an "actor" property or "object" property with value "Agent" (4.1.2.1.table1.row1, 4.1.4.2.a)
* An Agent uses the "name" property at most one time (Multiplicity, 4.1.a)
* A "name" property is a String (Type, 4.1.2.1.table1.row2.a)
* An "actor" property with "objectType" as "Agent" uses one of the following properties: "mbox", "mbox_sha1sum", 
"open_id", "account" (Multiplicity, 4.1.2.1.a)  - EXAMPLE ONLY
* An Agent uses the "mbox" property at most one time (Multiplicity, 4.1.a)
* An Agent does not use the "mbox" property if "mbox_sha1sum", "open_id", or 
"account" are used (Multiplicity, 4.1.2.1.b)
* An Agent uses the "mbox_sha1sum" property at most one time (Multiplicity, 4.1.a)
* An Agent does not use the "mbox_sha1sum" property if "mbox", "open_id", or 
"account" are used (Multiplicity, 4.1.2.1.b)
* An Agent uses the "open_id" property at most one time (Multiplicity, 4.1.a)
* An Agent does not use the "open_id" property if "mbox", "mbox_sha1sum", or 
"account" are used (Multiplicity, 4.1.2.1.b)
* An Agent uses the "account" property at most one time (Multiplicity, 4.1.a)
* An Agent does not use the "account" property if "mbox", "mbox_sha1sum", or 
"open_id" are used (Multiplicity, 4.1.2.1.b)
* A Group is defined by "objectType" of an "actor" property or "object" property with value "Group" (4.1.2.2.table1.row2, 4.1.4.2.a)
* A Group uses the "name" property at most one time (Multiplicity, 4.1.a)
* A Group uses the "member" property at most one time (Multiplicity, 4.1.a)
* An Anonymous Group is defined by "objectType" of an "actor" or "object" with value "Group" and
by none of "mbox", "mbox_sha1sum", "open_id", or "account" being used (4.1.2.2.table1.row2, 4.1.2.2.table1)
* An Anonymous Group uses the "member" property at most one time (Multiplicity, 4.1.a)
* An Anonymous Group uses the "member" property (Multiplicity, 4.1.2.2.table1.row3.b)
* The "member" property is an array of Objects following Agent requirements (4.1.2.2.table1.row3.a)
* An Identified Group is defined by "objectType" of an "actor" or "object" with value "Group" and
by one of "mbox", "mbox_sha1sum", "open_id", or "account" being used (4.1.2.2.table1.row2, 4.1.2.2.table2)
* An Identified Group uses one of the following properties: "mbox", "mbox_sha1sum", 
"open_id", "account" (Multiplicity, 4.1.2.1.a)  - EXAMPLE ONLY
* An Identified Group uses the "mbox" property at most one time (Multiplicity, 4.1.a)
* An Identified Group does not use the "mbox" property if "mbox_sha1sum", "open_id", or 
"account" are used (Multiplicity, 4.1.2.1.b)
* An Identified Group uses the "mbox_sha1sum" property at most one time (Multiplicity, 4.1.a)
* An Identified Group does not use the "mbox_sha1sum" property if "mbox", "open_id", or 
"account" are used (Multiplicity, 4.1.2.1.b)
* An Identified Group uses the "open_id" property at most one time (Multiplicity, 4.1.a)
* An Identified Group does not use the "open_id" property if "mbox", "mbox_sha1sum", or 
"account" are used (Multiplicity, 4.1.2.1.b)
* An Identified Group uses the "account" property at most one time (Multiplicity, 4.1.a)
* An Identified Group does not use the "account" property if "mbox", "mbox_sha1sum", or 
"open_id" are used (Multiplicity, 4.1.2.1.b)
* An "mbox" property is an IRI (Type, 4.1.2.3.table1.row1.a)
* An "mbox" property has the form "mailto:*email address*" (Syntax, 4.1.2.3.table1.row1.b)
* An "mbox_sha1sum" property is a String (Type, 4.1.2.3.table1.row2.a)
* An "open_id" property is a URI (Type, 4.1.2.3.table1.row3.a)
* An Account Object is the "account" property of a Group or Agent (Definition, 4.1.2.4)
* An Account Object uses the "homePage" property at most one time (Multiplicity, 4.1.a)
* An Account Object uses the "homePage" property (Multiplicity, 4.1.2.4.table1.row1.b)
* An Account Object's homePage" property is an IRL (Type, 4.1.2.4.table1.row1.a)
* An Account Object uses the "name" property at most one time (Multiplicity, 4.1.a)
* An Account Object uses the "name" property (Multiplicity, 4.1.2.4.table1.row2.b)
* An Account Object "name" property is a String (Type, 4.1.2.4.table1.row1.a)
* A "verb" property uses the "id" property at most one time (Multiplicity, 4.1.3.table1.row1.aultiplicity, 4.1.a)
* A "verb" property contains an "id" property (Multiplicity, 4.1.3.table1.row1.b)
* A "verb" property's "id" property is an IRI (Type, 4.1.3.table1.row1.a)
* A Voiding Statement is defined as a Statement whose "verb" property's "id" property's IRI ending with "voided" **Implicit** (4.3)
* A Voiding Statement's "objectType" field has a value of "StatementRef" (Format, 4.3.a)
* A Voiding Statement's Target is defined as the Statement corresponding to the "object" property's "id" property's UUID (4.3.b)
* A Voiding Statement cannot Target another Voiding Statement (4.3)
* A "verb" property uses the "display" property at most one time (Multiplicity, 4.1.a)
* A "verb" property's "display" property is a Language Map (Type, 4.1.3.table1.row2.a)
* A Language Map is defined as an array of language tag/String pairs has at least 1 entry  **Implicit**
* A Language Map follows RFC5646 (Format, 5.2.a, RFC5646)
* A "display" property is a Language Map (Type, 4.1.3.table1.row1.a, 4.1.11.table1.row2.a)
* An "object" property uses the "objectType" property at most one time (Multiplicity, 4.1.a)
* An "object" property uses the "id" property at most one time (Multiplicity, 4.1.a)
* An "object" property uses the "definition" property at most one time (Multiplicity, 4.1.a)
* An "object" property uses the "id" property exactly one time (Multiplicity, 4.1.4.1.table1.row2.b)
* An "object" property's "id" property is an IRI (Type, 4.1.4.1.table1.row2.a)
* An "object" property's "objectType" property is either "Activity", "Agent", "Group", "SubStatement",  or "StatementRef" (Vocabulary, 4.1.4.b)
* An Activity is defined by an "object" without "objectType" or with "objectType" having the value "Activity" (4.1.4.1.table1.row1.b)
* An Activity uses the "definition" property at most one time (Multiplicity, 4.1.a)
* An Activity's "definition" property is an Object (Type, 4.1.4.1.table1.row3.a)
* An Activity Definition is defined as the contents of a "definition" property object of an Activity (Format, 4.1.4.1.table2)
* An Activity Definition contains at least one of the following properties: name, description, type, moreInfo, interactionType, or extensions **Implicit**(Format, 4.1.4.1.table2, 4.1.4.1.table3)
* An Activity Definition uses the "name" property at most one time (Multiplicity, 4.1.a)
* An Activity Definition's "name" property is a Language Map (Type, 4.1.4.1.table2.row1.a)
* An Activity Definition uses the "description" property at most one time (Multiplicity, 4.1.a)
* An Activity Definition's "description" property is a Language Map (Type, 4.1.4.1.table2.row2.a)
* An Activity Definition uses the "type" property at most one time (Multiplicity, 4.1.a)
* An Activity Definition's "type" property is an IRI (Type, 4.1.4.1.table2.row3.a)
* An Activity Definition uses the "moreInfo" property at most one time (Multiplicity, 4.1.a)
* An Activity Definition's "moreinfo" property is an IRL (Type, 4.1.4.1.table2.row4.a)
* An Activity Definition uses the "interactionType" property at most one time (Multiplicity, 4.1.a)
* An Activity Definition uses the "correctResponsesPattern" property at most one time (Multiplicity, 4.1.a)
* An Activity Definition uses the "choices" property at most one time (Multiplicity, 4.1.a)
* An Activity Definition uses the "scale" property at most one time (Multiplicity, 4.1.a)
* An Activity Definition uses the "source" property at most one time (Multiplicity, 4.1.a)
* An Activity Definition uses the "target" property at most one time (Multiplicity, 4.1.a)
* An Activity Definition uses the "steps" property at most one time (Multiplicity, 4.1.a)
* An Activity Definition uses the "interactionType" property if any of the correctResponsesPattern, choices, scale, source, target, or steps properties are used (Multiplicity, 4.1.4.1.t) **Implicit**
* An Activity Definition's "interactionType" property is a String with a value of either “true-false”, “choice”, “fill-in”, “long-fill-in”, “matching”, “performance”, “sequencing”, “likert”, “numeric” or “other” (4.1.4.1.table3.row1.a, SCORM 2004 4th Edition RTE Book)
* An Activity Definition's "correctResponsesPattern" property is an array of Strings (4.1.4.1.table3.row2.a)
* An Activity Definition's "choices" property is an array of Interaction Components (4.1.4.1.table3.row3.a)
* An Activity Definition's "scale" property is an array of Interaction Components (4.1.4.1.table3.row3.a)
* An Activity Definition's "source" property is an array of Interaction Components (4.1.4.1.table3.row3.a)
* An Activity Definition's "target" property is an array of Interaction Components (4.1.4.1.table3.row3.a)
* An Activity Definition's "steps" property is an array of Interaction Components (4.1.4.1.table3.row3.a)
* An Interaction Component is an Object (4.1.4.1.table4)
* An Interaction Component uses the "id" property at most one time (Multiplicity, 4.1.a)
* An Interaction Component contains an "id" property (Multiplicity, 4.1.4.1.table4.row1.b)
* An Interaction Component's "id" property is a String (Type, 4.1.4.1.table4.row1.a)
* Within an array of Interaction Components, the "id" property is unique (Multiplicty, 4.1.4.1.w)
* An Interaction Component uses the "description" property at most one time (Multiplicity, 4.1.a)
* A "description" property is a Language Map (Type, 4.1.4.1.table4.row2.a, 4.1.11.table1.row3.a)
* An Activity Definition uses the "extensions" property at most one time (Multiplicity, 4.1.a)
* An Activity Definition's "extension" property is an Object (Type, 4.1.4.1.table2.row1.a)
* A Statement Reference is defined by the "objectType" of an "object" with value "StatementRef" (4.1.4.2.a)
* A Statement Reference uses the "id" property at most one time (Multiplicity, 4.1.a)
* A Statement Reference contains an "id" property (Multiplicity, 4.1.4.3.table1.row2.b)
* A Statement Reference's "id" property is a UUID (Type, 4.1.4.3.table1.row2.a)
* A Sub-Statement is defined by the "objectType" of an "object" with value "SubStatement" (4.1.4.3.d)
* A Sub-Statement follows the requirements of all Statements (4.1.4.3.e)
* A Sub-Statement cannot have a Sub-Statement (4.1.4.2.g)
* A Sub-Statement cannot use the "id" property at the Statement level (4.1.4.2.f)
* A Sub-Statement cannot use the "stored" property (4.1.4.2.f)
* A Sub-Statement cannot use the "version" property (4.1.4.2.f)
* A Sub-Statement cannot use the "authority" property (4.1.4.2.f)
* A Statement's "result" property uses a "score" property at most one time (Multiplicity, 4.1.5.table1.row1.c)
* A "score" property is an Object (Type, 4.1.5.table.row1.a)
* A "score" Object uses a "scaled" property at most one time (Multiplicity, 4.1.5.1.table1.row1.c)
* A "score" Object's "scaled" property is a Decimal accurate to seven significant decimal figures (Type, 4.1.5.1.table1.row1.a, SCORM 2004 4Ed)
* A "score" Object uses a "raw" property at most one time (Multiplicity, 4.1.5.1.table1.row3.c)
* A "score" Object's "raw" property is a Decimal accurate to seven significant decimal figures (Type, 4.1.5.1.table1.row2.a, SCORM 2004 4Ed)
* A "score" Object uses a "min" property at most one time (Multiplicity, 4.1.5.1.table1.row3.c)
* A "score" Object's "min" property is a Decimal accurate to seven significant decimal figures (Type, 4.1.5.1.table1.row3.a, SCORM 2004 4Ed)
* A "score" Object uses a "max" property at most one time (Multiplicity, 4.1.5.1.table1.row4.c)
* A "score" Object's "max" property is a Decimal accurate to seven significant decimal figures (Type, 4.1.5.1.table1.row4.a, SCORM 2004 4Ed)
* A Statement's "result" property uses a "success" property at most one time (Multiplicity, 4.1.5.table1.row2.c)
* A "success" property is a Boolean (Type, 4.1.5.table1.row2.a)
* A Statement's "result" property uses a "completion" property at most one time (Multiplicity, 4.1.5.table1.row3.c)
* A "completion" property is a Boolean (Type, 4.1.5.table1.row3.a)
* A Statement's "result" property uses a "response" property at most one time (Multiplicity, 4.1.5.table1.row3.c)
* A "response" property is a String (Type, 4.1.5.table1.row3.a)
* A Statement's "result" property uses a "duration" property at most one time (Multiplicity, 4.1.5.table1.row3.c)
* A "duration" property is a formatted to ISO 8601 (Type, 4.1.5.table1.row3.a)
* A "duration" property keeps at least 0.01 seconds of precision (Type, 4.1.5.table1.row3.a)
* A Statement's "result" property uses an "extensions" property at most one time (Multiplicity, 4.1.5.table1.row3.c)
* An "extensions" property is an Object (Type, 4.1.5.table1.row3.a)
* An Extension is defined as an Object of any "extensions" property (Multiplicity, 5.3)
* An Extension's structure is that of "key"/"value" pairs (Format, 5.3)
* An Extension can be empty (Format, 5.3)
* An Extension "key" is an IRI (Format, 5.3.a)
* A Statement's "context" property uses a "registration" property at most one time (Multiplicity, 4.1.6.table1.row1.c)
* A "registration" property is a UUID (Type, 4.1.6.table1.row1.a)
* A Statement's "context" property uses an "instructor" property at most one time (Multiplicity, 4.1.6.table1.row2.c)
* An "instructor" property is an Agent (Type, 4.1.6.table1.row2.a)
* A Statement's "context" property uses an "team" property at most one time (Multiplicity, 4.1.6.table1.row3.c)
* An "team" property is a Group (Type, 4.1.6.table1.row3.a)
* A Statement's "context" property uses a "contextActivities" property at most one time (Multiplicity, 4.1.6.table1.row4.c)
* A "contextActivities" property is an Object (Type, 4.1.5.table1.row4.a)
* A "contextActivities" property contains one or more key/value pairs (Format, 4.1.
* .a, 4.1.6.2.b)
* A "contextActivities" property's "key" has a value of "parent", "grouping", "category", or "other" (Format, 4.1.6.2.a)
* A "contextActivities" property's "value" is an Activity (Format, 4.1.6.2.a)
* A ContextActivity is defined as a single Activity of the "value" of the "contextActivities" property (definition)
* A Statement's "context" property uses an "revision" property at most one time (Multiplicity, 4.1.6.table1.row5.c)
* A "revision" property is a String (Type, 4.1.6.table1.row5.a)
* A Statement cannot contain both a "revision" property in its "context" property and have the value of the
"object" property's "objectType" be anything but "Activity" (4.1.6.a)
* A Statement's "context" property uses an "platform" property at most one time (Multiplicity, 4.1.6.table1.row6.c)
* A "platform" property is a String (Type, 4.1.6.table1.row6.a)
* A Statement cannot contain both a "platform" property in its "context" property and have the value of the
"object" property's "objectType" be anything but "Activity" (4.1.6.b)
* A Statement's "context" property uses a "language" property at most one time (Multiplicity, 4.1.6.table1.row7.c)
* A "language" property is a String (Type, 4.1.6.table1.row7.a)
* A "language" property follows RFC5646 (Format, 4.1.6.table1.row7.a, RFC5646)
* A Statement's "context" property uses a "statement" property at most one time (Multiplicity, 4.1.6.table1.row8.c)
* A "statement" property is a Statement Reference (Type, 4.1.6.table1.row8.a)
* A Statement's "context" property uses an "extensions" property at most one time (Multiplicity, 4.1.6.table1.row9.c)
* A "timestamp" property is a TimeStamp (Type, 4.1.2.1.table1.row7.a, 4.1.2.1.table1.row7.b)
* A "stored" property is a TimeStamp (Type, 4.1.2.1.table1.row8.a, 4.1.2.1.table1.row8.b)
* An "authority" property is an Agent or Group (Type, 4.1.2.1.table1.row9.a, 4.1.2.1.table1.row9.b, 4.1.9.a)
* An "authority" property which is also a Group contains exactly two Agents (Type, 4.1.2.1.table1.row9.a, 4.1.2.1.table1.row9.b, 4.1.9.a)
* A "version" property enters the LRS with the value of "1.0.0" or is not used (Vocabulary, 4.1.10.e, 4.1.10.f)
* A Statement's "attachments" property is an array of Attachments (4.1.2.1.table1.row11.a)
* An Attachment is an Object (Definition, 4.1.11)
* An Attachment uses a "usageType" property exactly one time (Multiplicity, 4.1.11.table1.row1.c)
* A "usageType" property is an IRI (Multiplicity, 4.1.11.table1.row1.b)
* An Attachment uses a "display" property exactly one time (Multiplicity, 4.1.11.table1.row2.c)
* An Attachment uses a "description" property at most one time (Multiplicity, 4.1.11.table1.row3.c)
* An Attachment uses a "contentType" property exactly one time (Multiplicity, 4.1.11.table1.row4.c)
* A "contentType" property is an Internet Media/MIME type (Format, 4.1.11.table1.row4.a, IETF.org)
* An Attachment uses a "length" property exactly one time (Multiplicity, 4.1.11.table1.row5.c)
* A "length" property is an Integer (Format, 4.1.11.table1.row5.a)
* An Attachment uses a "sha2" property exactly one time (Multiplicity, 4.1.11.table1.row6.c)  
* A "sha2" property is a String (Format, 4.1.11.table1.row6.a)
* An Attachment uses a "fileUrl" property at most one time (Multiplicity, 4.1.11.table1.row7.c)
* A "fileUrl" property is an IRL (Format, 4.1.11.table1.row7.a)
* A Sub-Statement cannot use the "authority" property (4.1.12)
* A Person Object is an Object (7.6)
* A Person Object uses an "objectType" property exactly one time (Multiplicity, 7.6.table1.row1.c)
* A Person Object's "objectType" property is a String and is "Person" (Format, Vocabulary, 7.6.table1.row1.a, 7.6.table1.row1.b)
* A Person Object uses a "name" property at most one time (Multiplicity, 7.6.table1.row2.c)
* A Person Object's "name" property is an Array of Strings (Multiplicity, 7.6.table1.row2.a)
* A Person Object uses a "mbox" property at most one time (Multiplicity, 7.6.table1.row3.c)
* A Person Object's "mbox" property is an Array of IRIs (Multiplicity, 7.6.table1.row3.a)
* A Person Object's "mbox" entries have the form "mailto:emailaddress" (Format, 7.6.table1.row3.a)
* A Person Object uses a "mbox_sha1sum" property at most one time (Multiplicity, 7.6.table1.row4.c)
* A Person Object's "mbox_sha1sum" property is an Array of Strings (Multiplicity, 7.6.table1.row4.a)
* A Person Object uses an "openid" property at most one time (Multiplicity, 7.6.table1.row5.c)
* A Person Object's "openid" property is an Array of Strings (Multiplicity, 7.6.table1.row5.a)
* A Person Object uses an "account" property at most one time (Multiplicity, 7.6.table1.row6.c)
* A Person Object's "account" property is an Array of Account Objects (Multiplicity, 7.6.table1.row6.a)

### 2.2 Learning Record Store (LRS) Requirements
* An LRS makes no modifications to stored data for any rejected request (Multiple, including 7.3.e)
* An LRS rejects with error code 400 Bad Request any Statement violating a Statement Requirement. (4.1.12, Varies)
* An LRS doesn't make any adjustments to incoming Statements that are not specifically mentioned in this section (4.1.12.d, Varies)
* An LRS rejects with error code 400 Bad Request any Statement having a property whose value is set to "null", except in an "extensions" property (4.1.12.d.a)
* An LRS stores 32-bit floating point numbers with at least the precision of IEEE 754 (4.1.12.d.a)
* An LRS generates the "id" property of a Statement if none is provided (Modify, 4.1.1.a)
* An LRS generates an "objectType" property of "Activity" to any "object" property if none is provided (Modify, 4.1.4.a) **Implicit**
* An LRS returns a ContextActivity in an array, even if only a single ContextActivity is returned (4.1.6.2.c, 4.1.6.2.d)
* An LRS rejects with error code 400 Bad Request, a Request whose "authority" is a Group of more than two Agents  (Format, 4.1.9.a)
* An LRS rejects with error code 400 Bad Request, a Request whose "authority" is a Group and consists of non-O-Auth Agents  (4.1.9.a)
* An LRS rejects with error code 403 Forbidden a Request whose "authority" is a Agent or Group that is not authorized  (4.1.9.b, 6.4.2)
* An LRS populates the "authority" property if it is not provided in the Statement, based on header information with the Agent corresponding to the user (contained within the header) (**Implicit**, 4.1.9.b, 4.1.9.c)
* An LRS rejects with error code 400 Bad Request, a Request which uses "version" and has the value set to anything but "1.0" or "1.0.x", where x is the semantic versioning number (Format, 4.1.10.b, 6.2.c, 6.2.f)
* An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments and does not have a "Content-Type" header with value "application/json" or "multipart/mixed" (Format, 4.1.11.a, 4.1.11.b)
* An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content-Type" header with value "application/json", and has a discrepancy in the number of Attachments vs. the number of fileURL members (4.1.11.a)
* An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "Content-Type" with value "multipart/mixed" (RFC 1341)
* An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "boundary" (4.1.11.b, RFC 1341)
* A Boundary is defined as the value of the body header named "boundary" (Definition, 4.1.11.b, RFC 1341)
* An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "MIME-Version" with a value of "1.0" or greater (4.1.11.b, RFC 1341)
* An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a Boundary before each "Content-Type" header (4.1.11.b, RFC 1341)
* An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not the first document part with a "Content-Type" header with a value of "application/json" (RFC 1341, 4.1.11.b.a)
* An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have all of the Statements in the first document part (RFC 1341, 4.1.11.b.a)
* An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and for any part except the first does not have a Header named "Content-Transfer-Encoding" with a value of "binary" (4.1.11.b.c, 4.1.11.b.e)
* An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and for any part except the first does not have a Header named "X-Experience-API-Hash" with a value of one of those found in a "sha2" property of a Statement in the first part of this document (4.1.11.b.c, 4.1.11.b.d)
* An LRS's Statement API will reject a GET request having the "attachment" parameter set to "true" if it does not follow the rest of the attachment rules (7.2.3.d)
* An LRS's Statement API will reject a GET request having the "attachment" parameter set to "false" if it includes attachment raw data (7.2.3.e)
* An LRS's Statement API will reject a GET request having the "attachment" parameter set to "false" and the Content-Type field in the header set to anything but "application/json" (7.2.3.d) (7.2.3.e) 
* An LRS rejects with error code 400 Bad Request, a Request which does not use a "X-Experience-API-Version" header name to any API except the About API (Format, 6.2.a, 6.2.f, 7.7.f)
* An LRS rejects with error code 400 Bad Request, a Request which the "X-Experience-API-Version" header's value is anything but "1.0" or "1.0.x", where x is the semantic versioning number to any API except the About API (Format, 6.2.d, 6.2.e, 6.2.f, 7.7.f)
* An LRS modifies the value of the header of any Statement not rejected by the previous three requirements to "1.0.1" (4.1.10.b)
* An LRS will not modify Statements based on a "version" before "1.0.1" (6.2.l)
* An LRS sends a header response with "X-Experience-API-Version" as the name and "1.0.1" as the value (Format, 6.2.a, 6.2.b)
* An LRS implements all of the Statement, State, Agent, and Activity Profile sub-APIs **Implicit**
* An LRS rejects with error code 400 Bad Request any request to an API which uses a parameter not recognized by the LRS (7.0.a)
* An LRS rejects with error code 400 Bad Request any request to an API which uses a parameter with differing case (7.0.b)
* An LRS rejects with error code 405 Method Not Allowed to any request to an API which uses a method not in this specification **Implicit ONLY in that HTML normally does this behavior**
* An LRS does not process any batch of Statements in which one or more Statements is rejected and if necessary, restores the LRS to the state in which it was before the batch began processing (7.0.c, **Implicit**)
* An LRS can only reject Statements using the error codes in this specification **Implicit**
* An LRS returns the correct corresponding error code when an error condition is met (7.0.e)
* An LRS rejects a Statement of bad authorization (either authentication needed or failed credentials) with error code 401 Unauthorized (7.1)
* An LRS rejects a Statement of insufficient permissions (credentials are valid, but not adequate) with error code 
403 Forbidden (7.1)
* An LRS rejects a Statement due to size if the Statement exceeds the size limit the LRS is configured to with error code 413 Request Entity Too Large (7.1)
* An LRS must be configurable to accept a Statement of any size (within reason of modern day storage capacity)  (7.1.b, **Implicit**)
* An LRS rejects a Statement due to network/server issues with an error code of 500 Internal Server Error (7.1)
* An LRS has a Statement API with endpoint "base IRI"+"/statements" (7.2)
* An LRS's Statement API accepts PUT requests (7.2.1)
* An LRS's Statement API rejects with Error Code 400 Bad Request any DELETE request (7.2)
* An LRS's Statement API accepts PUT requests only if it contains a "statementId" parameter (Multiplicity, 7.2.1.table1.a)
* An LRS's Statement API accepts PUT requests only if the "statementId" parameter is a String (Type, 7.2.1.table1.b)
* An LRS cannot modify a Statement, state, or Object in the event it receives a Statement with statementID equal to a Statement in the LRS already. (7.2.1.a, 7.2.2.b)
* An LRS's Statement API upon processing a successful PUT request returns code 204 No Content (7.2.1)
* An LRS's Statement API rejects with error code 409 Conflict any Statement with the "statementID" parameter equal to a Statement in the LRS already **Implicit** (7.2.1.b, 7.2.2.b)
* A POST request is defined as a "pure" POST, as opposed to a GET taking on the form of a POST (7.2.2.e)
* An LRS's Statement API accepts POST requests (7.2.2)
* An LRS's Statement API upon processing a successful POST request returns code 204 No Content and all Statement UUIDs within the POST **Implicit** (7.2.2)
* A GET request is defined as either a GET request or a POST request containing a GET request (7.2.3, 7.2.2.e)
* An LRS's Statement API accepts GET requests (7.2.3)
* An LRS's Statement API can process a GET request with "statementId" as a parameter (7.2.3)
* An LRS's Statement API can process a GET request with "voidedStatementId" as a parameter  (7.2.3)
* An LRS's Statement API can process a GET request with "agent" as a parameter  **Implicit**
* An LRS's Statement API can process a GET request with "verb" as a parameter  **Implicit**
* An LRS's Statement API can process a GET request with "activity" as a parameter  **Implicit**
* An LRS's Statement API can process a GET request with "registration" as a parameter  **Implicit**
* An LRS's Statement API can process a GET request with "related_activities" as a parameter  **Implicit**
* An LRS's Statement API can process a GET request with "related_agents" as a parameter  **Implicit**
* An LRS's Statement API can process a GET request with "since" as a parameter  **Implicit**
* An LRS's Statement API can process a GET request with "until" as a parameter  **Implicit**
* An LRS's Statement API can process a GET request with "limit" as a parameter  **Implicit**
* An LRS's Statement API can process a GET request with "format" as a parameter  **Implicit**
* An LRS's Statement API can process a GET request with "attachments" as a parameter  **Implicit**
* An LRS's Statement API can process a GET request with "ascending" as a parameter  **Implicit**
* An LRS's Statement API rejects a GET request with both "statementId" and anything other than "attachments" or "format" as parameters (7.2.3.a, 7.2.3.b) with error code 400 Bad Request.
* An LRS's Statement API rejects a GET request with both "voidedStatementId" and anything other than "attachments" or "format" as parameters (7.2.3.a, 7.2.3.b) with error code 400 Bad Request.
* An LRS's Statement API upon processing a successful GET request with a "statementId" parameter, returns code 200 OK and a single Statement with the corresponding "id".  (7.2.3)
* An LRS's Statement API upon processing a successful GET request with a "voidedStatementId" parameter, returns code 200 OK and a single Statement with the corresponding "id".  (7.2.3)
* An LRS's Statement API upon processing a successful GET request with neither a "statementId" nor a "voidedStatementId" parameter, returns code 200 OK and a StatementResult Object.  (7.2.3)
* An LRS's Statement API upon processing a GET request, returns a header with name "X-Experience-API-Consistent-Through" regardless of the code returned. (7.2.3.c)
* An LRS's Statement API, upon receiving a GET request, has a field in the header with name "Content-Type" **Assumed?****
* An LRS's "X-Experience-API-Consistent-Through" header is an ISO 8601 combined date and time (Type, 7.2.3.c).
* An LRS's "X-Experience-API-Consistent-Through" header's value is not before (temporal) any of the "stored" values of any of the returned Statements (7.2.3.c).
* An LRS's Statement API, upon processing a successful GET request, will return a single "statements" property (Multiplicity, Format, 4.2.table1.row1.c)
* A "statements" property is an Array of Statements (Type, 4.2.table1.row1.a)
* The Statements within the "statements" property will correspond to the filtering criterion sent in with the GET request **Implicit** (7.2.4.b)
* The LRS will NOT reject a GET request which returns an empty "statements" property (**Implicit**, 4.2.table1.row1.b)
* A "statements" property which is too large for a single page will create a container for each additional page (4.2.table1.row1.b)
* An LRS's Statement API, upon processing a successful GET request, will return a single "more" property (Multiplicity, Format, 4.2.table1.row2.c)
* A "more" property is an IRL (Format, 4.2.table1.row2.a)
* The "more" property an empty string if the entire results of the original GET request have been returned (4.2.table1.row2.b) (Do we need to be specific about the "type" of empty string?)
* If not empty, the "more" property's IRL refers to a specific container object corresponding to the next page of results from the orignal GET request (4.2.table1.row1.b)
* A "more" property IRL is accessible for at least 24 hours after being returned (4.2.a)
* A "more" property's referenced container object follows the same rules as the original GET request, originating with a single "statements" property and a single "more" property (4.2.table1.row1.b)
* A Voided Statement is defined as a Statement that is not a Voiding Statement and is the Target of a Voiding Statement within the LRS (4.2.c)
* An LRS's Statement API, upon processing a successful GET request, can only return a Voided Statement if that Statement is specified in the voidedStatementId parameter of that request (7.2.4.a)
* An LRS's Statement API, upon processing a successful GET request wishing to return a Voided Statement still returns Statements which target it (7.2.4.b)
* An LRS has a State API with endpoint "base IRI"+"/activities/state" (7.3.table1.row1.a ,7.3.table1.row1.c)
* An LRS has an Activities API with endpoint "base IRI" + /activities" (7.5) **Implicit** (in that it is not named this by the spec)
* An LRS has an Activity Profile API with endpoint "base IRI"+"/activities/profile" (7.3.table1.row2.a, 7.3.table1.row2.c)
* An LRS has an Agents API with endpoint "base IRI" + /agents" (7.6) **Implicit** (in that it is not named this by the spec)
* An LRS has an Agent Profile API with endpoint "base IRI"+"/agents/profile" (7.3.table1.row3.a, 7.3.table1.row3.c)
* An LRS has an About API with endpoint "base IRI"+"/about" (7.7.a)
* An LRS will accept a POST request to the State API (7.3.table1.row1.b)
* An LRS will accept a POST request to the Activity Profile API (7.3.table1.row2.b)
* An LRS will accept a POST request to the Agent Profile API (7.3.table1.row3.b)
* An LRS cannot reject a POST request to the State API based on the contents of the name/value pairs of the document (7.3.b) **Implicit**
* An LRS cannot reject a POST request to the Activity Profile API based on the contents of the name/value pairs of the document (7.3.b) **Implicit**
* * An LRS cannot reject a POST request to the Agent Profile API based on the contents of the name/value pairs of the document (7.3.b) **Implicit**
* An LRS's State API, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (7.3.f)
* An LRS's State API, rejects a POST request if the document is found and either document's type is not "application/json" with error code 400 Bad Request (7.3.e)
* A Document Merge is defined by the merging of an existing document at an endpoint with a document received in a POST request. (7.3)
* A Document Merge de-serializes all Objects represented by each document before making other changes. (7.3.d)
* A Document Merge overwrites any duplicate Objects from the previous document with the new document. (7.3.d)
* A Document Merge only performs overwrites at one level deep, although the entire object is replaced. (7.3.d)
* A Document Merge re-serializes all Objects to finalize a single document (7.3.d)
* An LRS's State API performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (7.3.d)
* An LRS's Activity Profile API, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (7.3.f)
* An LRS's Activity Profile API, rejects a POST request if the document is found and either document's type is not "application/json" with error code 400 Bad Request (7.3.e)
* An LRS's Activity Profile API performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (7.3.d)
* An LRS's Agent Profile API, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (7.3.f)
* An LRS's Agent Profile API, rejects a POST request if the document is found and either document's type is not "application/json" with error code 400 Bad Request (7.3.e)
* An LRS's Agent Profile API performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (7.3.d)
* An LRS's State API accepts PUT requests (7.4)
* An LRS's State API rejects a PUT request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)
* An LRS's State API rejects a PUT request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)
** In 1.0.3, the IRI requires a scheme, but does not in 1.0.2, thus we only test type String in this version**
* An LRS's State API rejects a PUT request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row2.b)
* An LRS's State API rejects a PUT request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table1.row2.a)
* An LRS's State API can process a PUT request with "registration" as a parameter  (multiplicity, 7.4.table1.row3.b)
* An LRS's State API rejects a PUT request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request(format, 7.4.table1.row3.a)
* An LRS's State API rejects a PUT request without "stateId" as a parameter with error code 400 Bad Request(multiplicity, 7.4.table1.row1.b)
* An LRS's State API rejects a PUT request  with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request(format, 7.4.table1.row1.a)
* An LRS's State API upon processing a successful PUT request returns code 204 No Content (7.4.a)
* An LRS's State API accepts POST requests (7.4)
* An LRS's State API rejects a POST request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)
* An LRS's State API rejects a POST request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)
* An LRS's State API rejects a POST request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row2.b)
* An LRS's State API rejects a POST request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table1.row2.a)
* An LRS's State API can process a POST request with "registration" as a parameter (multiplicity, 7.4.table1.row3.b)
* An LRS's State API rejects a POST request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, 7.4.table1.row3.a)
* An LRS's State API rejects a POST request without "stateId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)
* An LRS's State API rejects a POST request  with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)
* An LRS's State API upon processing a successful POST request returns code 204 No Content (7.4.a)
* An LRS's State API accepts GET requests (7.4)
* An LRS's State API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)
* An LRS's State API rejects a GET request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)
* An LRS's State API rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row2.b)
* An LRS's State API rejects a GET request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table1.row2.a)
* An LRS's State API can process a GET request with "registration" as a parameter (multiplicity, 7.4.table1.row3.b)
* An LRS's State API rejects a GET request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, 7.4.table1.row3.a)
* An LRS's State API can process a GET request with "stateId" as a parameter (multiplicity, 7.4.table1.row3.b, 7.4.table2.row3.b) (multiplicity, 7.4.table1.row1.b)
* An LRS's State API rejects a GET request  with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)
* An LRS's State API can process a GET request with "since" as a parameter (multiplicity, 7.4.table2.row4.b, 7.4.table2.row3.b)
* An LRS's State API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, 7.4.table2.row4.a)
* An LRS's State API upon processing a successful GET request with a valid "stateId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (7.4.b)
* NOTE:  **There is no requirement here that the LRS reacts to the "since" parameter in the case of a GET request with valid "stateId" - this is intentional**
* An LRS's State API upon processing a successful GET request without "stateId" as a parameter returns an array of ids of state data documents satisfying the requirements of the GET and code 200 OK (7.4.c)
* An LRS's returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request (7.4.table2.row4)
* An LRS's State API accepts DELETE requests (7.4)
* An LRS's State API rejects a DELETE request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)
* An LRS's State API rejects a DELETE request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)
* An LRS's State API rejects a DELETE request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row2.b)
* An LRS's State API rejects a DELETE request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table1.row2.a)
* An LRS's State API can process a DELETE request with "registration" as a parameter (multiplicity, 7.4.table1.row3.b)
* An LRS's State API rejects a DELETE request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, 7.4.table1.row3.a)
* An LRS's State API can process a DELETE request with "stateId" as a parameter (multiplicity, 7.4.table1.row3.b, 7.4.table2.row3.b) (multiplicity, 7.4.table1.row1.b)
* An LRS's State API rejects a DELETE request  with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)
* An LRS's State API can process a DELETE request with "since" as a parameter (multiplicity, 7.4.table2.row4.b, 7.4.table2.row3.b)  **Is this valid??** 
* An LRS's State API rejects a DELETE request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, 7.4.table2.row4.a)  **And this would follow...**
* An LRS's State API upon processing a successful DELETE request with a valid "stateId" as a parameter deletes the document satisfying the requirements of the DELETE and returns code 204 No Content (7.4.b)
* NOTE:  **There is no requirement here that the LRS reacts to the "since" parameter in the case of a GET request with valid "stateId" - this is intentional**
* An LRS's State API upon processing a successful DELETE request without "stateId" as a parameter deletes documents satisfying the requirements of the DELETE and code 200 OK (7.4.d)
* An LRS's Activities API accepts GET requests (7.5)
* An LRS's Activities API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table1.row1.b)
* An LRS's Activities API rejects a GET request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table1.row1.a)
* An LRS's Activities API upon processing a successful GET request returns the complete Activity Object (7.5)
* An LRS's Activity Profile API accepts PUT requests (7.5)
* An LRS's Activity Profile API rejects a PUT request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)
* An LRS's Activity Profile API API rejects a PUT request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)
* An LRS's Activity Profile API rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)
* An LRS's Activity Profile API rejects a PUT request  with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)
* An LRS's Activity Profile API upon processing a successful PUT request returns code 204 No Content (7.5.b)
* An LRS's Activity Profile API accepts POST requests (7.5)
* An LRS's Activity Profile API rejects a POST request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)
* An LRS's Activity Profile API rejects a POST request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)
* An LRS's Activity Profile API rejects a POST request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)
* An LRS's Activity Profile API API rejects a POST request  with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)
* An LRS's Activity Profile API upon processing a successful POST request returns code 204 No Content (7.5.b)
* An LRS's Activity Profile API accepts DELETE requests (7.5)
* An LRS's Activity Profile API rejects a DELETE request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)
* An LRS's Activity Profile API rejects a DELETE request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)
* An LRS's Activity Profile API rejects a DELETE request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)
* An LRS's Activity Profile API rejects a DELETE request  with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)
* An LRS's Activity Profile API upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content (7.5.b)
* An LRS's Activity Profile API accepts GET requests (7.5)
* An LRS's Activity Profile API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)
* An LRS's Activity Profile API rejects a GET request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row1.a)
* An LRS's Activity Profile API rejects a GET request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table2.row2.a)
* An LRS's Activity Profile API can process a GET request with "since" as a parameter (multiplicity, 7.5.table3.row2.c, 7.5.table3.row2.b)
* An LRS's Activity Profile API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, 7.5.table3.row2.a)
* An LRS's Activity Profile API upon processing a successful GET request with a valid "profileId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (7.5.c)
* An LRS's Activity Profile API upon processing a successful GET request without "profileId" as a parameter returns an array of ids of activity profile documents satisfying the requirements of the GET and code 200 OK (7.5.d)
* An LRS's returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present (7.5.table3.row2)
* An LRS's Agents API accepts GET requests (7.6)
* An LRS's Agents API rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table2.row1.c)
* An LRS's Agents API rejects a GET request  with "agent" as a parameter if it is a valid (in structure) Agent with error code 400 Bad Request (format, 7.6.table2.row1.a)
* An LRS's Agents API upon processing a successful GET request returns a Person Object if the "agent" parameter  can be found in the LRS and code 200 OK (7.6.c, 7.6.d)
* An LRS's Agents API upon processing a successful GET request returns a Person Object based on matched data from the "agent" parameter and code 200 OK (7.6.d)
* An LRS's Agent Profile API accepts PUT requests (7.6)
* An LRS's Agent Profile API rejects a PUT request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row1.c)
* An LRS's Agent Profile API rejects a PUT request  with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, 7.6.table3.row1.a)
* An LRS's Agent Profile API rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row2.c)
* An LRS's Agent Profile API rejects a PUT request  with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.6.table3.row2.a)
* An LRS's Agent Profile API upon processing a successful PUT request returns code 204 No Content (7.6.e)
* An LRS's Agent Profile API accepts POST requests (7.6)
* An LRS's Agent Profile API rejects a POST request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row1.c)
* An LRS's Agent Profile API rejects a POST request  with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, 7.6.table3.row1.a)
* An LRS's Agent Profile API rejects a POST request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row2.c)
* An LRS's Agent Profile API rejects a POST request  with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.6.table3.row2.a)
* An LRS's Agent Profile API upon processing a successful POST request returns code 204 No Content (7.6.e)
* An LRS's Agent Profile API accepts DELETE requests (7.6)
* An LRS's Agent Profile API rejects a DELETE request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row1.c)
* An LRS's Agent Profile API rejects a DELETE request  with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, 7.6.table3.row1.a)
* An LRS's Agent Profile API rejects a DELETE request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row2.c)
* An LRS's Agent Profile API rejects a DELETE request  with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.6.table3.row2.a)
* An LRS's Agent Profile API upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content (7.6.e)
* An LRS's Agent Profile API accepts GET requests (7.6)
* An LRS's Agent Profile API rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row1.c, 7.6.table4.row1.c)
* An LRS's Agent Profile API rejects a GET request with "agent" as a parameter if it is not an Actor Object with error code 400 Bad Request (format, 7.6.table3.row1.c, 7.6.table4.row1.c)
* An LRS's Agent Profile API can process a GET request with "since" as a parameter (Multiplicity, 7.6.table4.row2.a, 7.5.table4.row2.c)
* An LRS's Agent Profile API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, 7.6.table4.row2.a)
* An LRS's Agent Profile API upon processing a successful GET request with a valid "profileId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (7.6, 7.6.f)
* An LRS's Agent Profile API upon processing a successful GET request without "profileId" as a parameter returns an array of ids of agent profile documents satisfying the requirements of the GET and code 200 OK (7.6, 7.6.g)
* An LRS's returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present (7.6.table4.row2, 7.6.g)
* An LRS's About API accepts GET requests (7.7.b)
* An LRS's Activity Profile API upon processing a successful GET request returns a version property and code 200 OK (multiplicity, 7.7.table1.row1.c, 7.7.c) 
* An LRS's About API's version property is an array of strings (format, 7.7.table1.row1.a)
* An LRS's About API's version property contains at least one string of "1.0.1" (7.7.d)
* An LRS's About API's version property can only have values of ".9", ".95", "1.0", "1.0.0", or ""1.0." + X" with (7.7.d.a)
* An LRS's About API upon processing a successful GET request can return an Extension with code 200 OK (multiplicity, 7.7.table1.row2.c, 7.7.c) 
* Any LRS API that accepts a POST request can accept a POST request with a single query string parameter named "method" on that request (7.8.a)
* A Cross Origin Request is defined as this POST request as described in the previous requirement (definition)
* An LRS must parse the body of a Cross Origin Request and construct a new Request from it with the type of Request being the same as the value of the "method" parameter (7.8.a, 7.8.b)
* An LRS will map form parameters from the body of the Cross Origin Request to the similarly named HTTP Headers in the new Request (7.8.b)
* An LRS rejects a new Request in the same way for violating rules of this document as it would a normal Request **Implicit**
* An LRS will reject any request sending content which does not have a form parameter with the name of "content" (7.8.c)
* An LRS will treat the content of the form parameter named "content" as a UTF-8 String (7.8.c)
* An LRS will reject a new Request with a form parameter named "content" if "content" is found to be binary data  with error code 400 Bad Request (7.8.c)
* An LRS will reject a new Request which attempts to send attachment data with error code 400 Bad Request (7.8.d)
* An LRS will reject a Cross Origin Request or new Request which contains any extra information with error code 400 Bad Request **Implicit**
* An LRS accepts HEAD requests (7.10.a)
* An LRS responds to a HEAD request in the same way as a GET request, but without the message-body (7.10.a, 7.10.a.a) **This means run ALL GET tests with HEAD**
* An LRS accepts HEAD requests without Content-Length headers (7.10.a.b)
* An LRS accepts GET requests without Content-Length headers **Implicit**

### 2.3 Miscellaneous Requirements (Includes Activity Provider responsibilities to LRS)

* The display property MUST be used to illustrate the meaning which is already determined by the Verb IRI. (No way to automate this)
* The display property MUST NOT be used to alter the meaning of a Verb. (No way to validate this)
