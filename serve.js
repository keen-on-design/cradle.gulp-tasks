'use strict';

module.exports = function () {
  $.gulp.task('serve', function () {
    $.browserSync.init({
      open: false,
      server: $.config.destDev
    });

    $.browserSync.watch([$.config.destDev + '**/*.*', '!**/*.css'], $.browserSync.reload);
  });
};