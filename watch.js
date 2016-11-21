'use strict';

module.exports = function () {
  $.gulp.task('watch', function () {
    $.gulp.watch($.config.js.location, $.gulp.series('js:app'));
    $.gulp.watch($.config.sass.location, $.gulp.series('sass:process'));
    $.gulp.watch($.config.pug.location, $.gulp.series('pug:process'));
    $.gulp.watch($.config.fonts.location, $.gulp.series('fonts'));
    $.gulp.watch($.config.svg.location, $.gulp.series('svg:sprite'));
    $.gulp.watch($.config.images.location, $.gulp.series('images:process'));
  });
};