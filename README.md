Experience API LRS Test
=============

## Policies and Procedures for Conformance Testing Group:

## Forum Link: https://groups.google.com/a/adlnet.gov/forum/#!forum/xapi-spec

##Requirements
[Testing requirements.](https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md)

### Goal

This group exists to create a single conformance test to be used as the official Experience API 
(xAPI) v1.0.1 conformance test.  This test will have the backing of the Advanced Distributed 
Learning (ADL) Initiative.

### Conformance Test Scope

* The conformance test will test ONLY an LRS and test ONLY mandatory requirements within the xAPI Specification.
* An LRS that passes this conformance test can and should be used to test conformance of content/clients of xAPI.
* All tests must be passed to achieve conformance, as opposed to “passing” all requirements in the TR document (these should be the same, but conformance is driven by the test results)
* It is anticipated that additional tests for communities of practice may be created, such as for CMI5.  Those collections of tests can be included in this group, but are not part of the conformance endorsed by ADL.

### Conformance Testing Requirements Document

* All conformance requirements will be listed in the Testing Requirements (TR) document in a means which tests/documents can refer to a specific requirement number.
* All conformance requirements in the TR document will link directly to the specification by section and requirement # within that section.
* The end goal is to have a direct mapping of every TR requirement to the specification document, however it is anticipated that some indirect mappings or changes to the specification itself may be necessary.
* An example of an indirect mapping would be a requirement imposed on a Statement but not on an LRS to validate a Statement in that way.  Clearly the intention is for the LRS to validate conformance in this case, but may not have been explicitly mentioned.


### Process 

* The group will work to create the TR document and test cases, which will be called tests.
* The group will use current tests to create a process for new tests.
* In the event of a requirement needed in the TR, but does not show up in the spec document, an issue will be created within the specification group.
* Differing TR expectations must have group consensus before bringing a change to the specification group.
* After the TR document is complete, the specification will be examined for requirements not referenced by the TR document.
* Another post-TR document thing to look at is LRS to LRS Statement transfer and if specific requirements are needed.

### Tests

* Every TR will have one or more test associated with it.  
* Tests and the TR will reference each other, as opposed to the TR document to specification references, which only go one way.
* There may be more than one test that references the same TR document entry.
* Tests may only test things referenced within the TR document.
* Issues can be opened within this group to perform gap analysis on whether what the test is testing should be a part of the TR document.  This will most commonly occur on existing tests as they migrate into this effort.
* All tests upon being run must explicitly state if they pass or fail, and if there is a failure, refer to the exact requirement that has failed via the TR document numbering system.

##Contributing to the project
### Contributing to the Experience API LRS Test Suite

#### Testing Requirements

#### Test Suite

##### About the Branches

The conformance branch exists so that LRS vendors can have a chance to make sure they are conformant before the next conformance version of the test suite is released.
It also means that an LRS can claim conformance to a specific conformance version of the test suite, ultimately this becomes what an LRS user should be interested in.

Changes can be made to the `master` branch that do not affect whether an LRS is conformant and therefore vendors do not need to track this version as closely.

##### Pull Requests

When making a source only change submit a Pull Request against the `master` branch.

When making a change that can affect whether an LRS is deemed conformant with a particular conformance version then submit a Pull Request against the `conformance` branch.

It is recommended that change sets are minimal, and made against the tip of the current branch.

Turn on `developer` flag in config file to make sure files are linted.

## License
   Copyright &copy;2016 Advanced Distributed Learning

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

