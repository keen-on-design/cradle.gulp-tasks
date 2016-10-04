'use strict';

//Relocate and optimize images
module.exports = function() {
    $.gulp.task('images', function() {
        return $.gulp.src($.config.images.location)
            .pipe($.plugins.cache($.plugins.imagemin($.config.images.config.imagemin)))
            .pipe($.gulp.dest($.config.images.destination));
    });
};