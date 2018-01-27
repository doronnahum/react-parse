// require all the files provided as command line arguments
// used to run tests for tap, tape, or instanbul

var resolve = require('path').resolve;

process.argv.slice(2).map(function (file) {
    require(resolve(file));
});
