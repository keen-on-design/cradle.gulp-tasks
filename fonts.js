'use strict';

module.exports = function () {

  //Moves font files to destination folder
  $.gulp.task('fonts', function () {
    return $.gulp.src($.config.fonts.location)
      .pipe($.plugins.if($.argv.release === undefined,
        $.gulp.dest($.config.fonts.destinationDev)
      ))
      .pipe($.plugins.if($.argv.release,
        $.gulp.dest($.config.fonts.destinationRls)
      ));
  });
};