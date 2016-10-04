'use strict';

//Checks for realFavicon global update
module.exports = function() {
    $.gulp.task('favicon.process', function() {
        return $.gulp.src([$.config.app.favicon.destination + '**/*.*', '!' + $.config.app.favicon.location])
            .pipe($.gulp.dest($.config.dest));
    });
};