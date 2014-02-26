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
* A Statement uses the "attachment" property at most one time (Multiplicity, 4.1.a)
* A Statement contains an "actor" property (Multiplicity, 4.1.b)
* A Statement contains a "verb" property (Multiplicity, 4.1.b)
* A Statement contains an "object" property (Multiplicity, 4.1.b)
* An "id" property is a String (Type, 4.1.1.description.a)
* An "id" property is a UUID following RFC 4122 (Syntax, RFC 4122)
* An "actor" property uses the "objectType" property at most one time (Multiplicity, 4.1.a)
* An "objectType" property is a String (Type, 4.1.2.1.table1.row1.a)
* An "actor" property's "objectType" property is either "Agent" or "Group" (Vocabulary, 4.1.2.1.table1.row1.b, 4.1.2.1.table1.row1.b)
* An Agent is defined by "objectType" of an "actor" or "object" with value "Agent" (4.1.2.1.table1.row1)
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
* A Group is defined by "objectType" of an "actor" or "object" with value "Group" (4.1.2.2.table1.row2)
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
* An "account" property uses the "homePage" property at most one time (Multiplicity, 4.1.a)
* An "account" property uses the "homePage" property (Multiplicity, 4.1.2.4.table1.row1.b)
* An "account" property's homePage" property is an IRL (Type, 4.1.2.4.table1.row1.a)
* An "account" property uses the "name" property at most one time (Multiplicity, 4.1.a)
* An "account" property uses the "name" property (Multiplicity, 4.1.2.4.table1.row2.b)
* An "account" property's "name" property is a String (Type, 4.1.2.4.table1.row1.a)
* A "verb" property uses the "id" property at most one time (Multiplicity, 4.1.3.table1.row1.aultiplicity, 4.1.a)
* A "verb" property contains an "id" property (Multiplicity, 4.1.3.table1.row1.b)
* A "verb" property's "id" property is an IRI (Type, 4.1.3.table1.row1.a)
* A "verb" property uses the "display" property at most one time (Multiplicity, 4.1.a)
* A "verb" property's "display" property is a Language Map (Type, 4.1.3.table1.row2.a)
* A Language Map is defined as a list of language tag/String pairs has at least 1 entry  **Implicit**
* A Language Map follows RFC5646 (Format, 5.2.a, RFC5646)
* A "display" property uses a Language Map (Format, 4.1.3.table1.row1.a)
* An "object" property uses the "objectType" property at most one time (Multiplicity, 4.1.a)
* An "object" property uses the "id" property at most one time (Multiplicity, 4.1.a)
* An "object" property uses the "definition" property at most one time (Multiplicity, 4.1.a)
* An "object" property contains an "id" property (Multiplicity, 4.1.4.1.table1.row2.b)
* An "object" property's "id" property is an IRI (Type, 4.1.4.1.table1.row2.a)
* An "object" property's "objectType" property is either "Activity", "Agent", "Group", "SubStatement",  or"StatementRef" (Vocabulary, 4.1.4.b)
* An Activity is defined by the "objectType" of an "object" with value "Activity" (4.1.4.1.table1.row1.b)
* An Activity uses the "definition" property at most one time (Multiplicity, 4.1.a)
* An Activity's "definition" property is an Object (Type, 4.1.4.1.table1.row3.a)
* An Activity Object is the contents of a "definition" property object of an Activity (Format, 4.1.4.1.table2)
* An Activity Object contains at least one of the following properties:  **Implicit**(Format, 4.1.4.1.table2)



### 2.2 Learning Record Store (LRS) Requirements

* An LRS rejects with 400 Bad Request any Statement violating a Statement Requirement. (Varies, Varies)
* An LRS generates the "id" property of a Statement if none is provided (Modify, 4.1.1.a)
* An LRS rejects with 409 Conflict the "id" property of a Statement if the "id" already exists in the LRS
 (Modify, 4.1.1.a) **Implicit**
* An LRS generates an "objectType" property of "Activity" to any "object" property if none is provided (Modify, 4.1.4.a) **Implicit**


### 2.3 Miscellaneous Requirements

* The display property MUST be used to illustrate the meaning which is already determined by the Verb IRI. (No way to automate this)
* The display property MUST NOT be used to alter the meaning of a Verb. (No way to validate this)