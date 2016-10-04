'use strict';

//Relocate font files to build folder
module.exports = function() {
    $.gulp.task('fonts', function() {
        return $.gulp.src($.config.fonts.location)
            .pipe($.gulp.dest($.config.fonts.destination))
        ;
    });
};