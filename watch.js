'use strict';

module.exports = function() {
    $.gulp.task('watch', function() {
        $.gulp.watch($.config.js.location, $.gulp.series('js.process'));
        $.gulp.watch($.config.sass.location, $.gulp.series('sass'));
        $.gulp.watch($.config.pug.location, $.gulp.series('pug'));
        $.gulp.watch($.config.images.location, $.gulp.series('images'));
    });
};