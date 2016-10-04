'use strict';

//Clear build folder
module.exports = function() {
    $.gulp.task('clean', function(cb) {
        return $.rimraf($.config.dest, cb);
    });
};