argg
====
A poor man's test runner for [tap](https://github.com/isaacs/node-tap), [tape](https://github.com/substack/tape), or similar, that also can be used with [istanbul](https://github.com/gotwarlost/istanbul). It's just three lines of code to `require` pathnames from the command line. Shell globbing test runner, if you will, which you can do when your tests are simple scripts.

usage
-----
Install like:

    npm i argg --save-dev

…then in your package.json add:

    "scripts": {
        "test": "node node_modules/argg tests/*.js",
        "cover": "istanbul cover node_modules/argg tests/*.js"
    },

…so from the command line, you can run tests and get code coverage with istanbul like:

    npm test
    npm run cover

why
---
Hey ok, tap has a [nice test runner](https://github.com/isaacs/node-tap/blob/master/lib/tap-runner.js), but I would need something [like](https://github.com/substack/tape/pull/19) this for tape by itself, or for either tap or tape with istanbul. I could make a file and explicitly require the files, but that takes typing, and I know I'd miss something.

license
-------
MIT licensed by permission from my employer. See LICENSE.txt.
