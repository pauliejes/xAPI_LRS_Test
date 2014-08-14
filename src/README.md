## Dependencies

This test suite requires Node.js, grunt, and access to an LRS.

To install grunt use `npm`, you may need escalated privileges via `sudo`, a Windows administrator shell, or similar:

    npm install -g grunt-cli

## Setup

The easiest way to run the test suite is to clone the git repository directly using:

    git clone https://github.com/adlnet/xAPI_LRS_Test

Then change to the `src/` directory:

    cd src/

With the repository cloned install the dependencies using:

    npm install

With dependencies ready configure the LRS to be tested by copying the `config.json.template` to `config.json` and set the values of "endpoint", "username", "password", and "version".

After configuration you can run the suite using:

    grunt

## Commands

There are a number of different ways to run part of the test suite, and to target specific features to test.

The following are the most common commands:

    > grunt
    > grunt stage1
    > grunt stage2
    > grunt clean
    > grunt clearSandbox

Other commands that may be useful:

    > grunt stage1 --feature=features/about.feature
    > grunt stage1 --feature=features/statementStructure/
    > grunt stage1 --feature=features/statementStructure/object*.feature
    > grunt stage1 --feature=features/*.feature --timeout=10000 --slow=2000
