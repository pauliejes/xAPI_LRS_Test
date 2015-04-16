# Contributing to the Experience API LRS Test Suite

## Testing Requirements

## Test Suite

### About the Branches

The conformance branch exists so that LRS vendors can have a chance to make sure they are conformant before the next conformance version of the test suite is released.
It also means that an LRS can claim conformance to a specific conformance version of the test suite, ultimately this becomes what an LRS user should be interested in.

Changes can be made to the `master` branch that do not affect whether an LRS is conformant and therefore vendors do not need to track this version as closely.

### Pull Requests

When making a source only change submit a Pull Request against the `master` branch.

When making a change that can affect whether an LRS is deemed conformant with a particular conformance version then submit a Pull Request against the `conformance` branch.

It is recommended that change sets are minimal, and made against the tip of the current branch.

Turn on `developer` flag in config file to make sure files are linted.
