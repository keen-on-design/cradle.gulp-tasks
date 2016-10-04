'use strict';

module.exports = function() {
    $.gulp.task('serve', function() {
        $.browserSync.init({
            open    : false,
            server  : $.config.dest
        });

        $.browserSync.watch([$.config.dest + '**/*.*', '!**/*.css'], $.browserSync.reload);
    });
};