'use strict';

module.exports = function () {

  //Optimize and move images to destination folder
  $.gulp.task('images:process', function () {
    return $.gulp.src($.config.images.location)
      .pipe($.plugins.if($.argv.release,
        $.plugins.cache($.plugins.imagemin($.config.images.config.imagemin))
      ))
      .pipe($.plugins.if($.argv.release === undefined,
        $.gulp.dest($.config.images.destinationDev)
      ))
      .pipe($.plugins.if($.argv.release,
        $.gulp.dest($.config.images.destinationRls)
      ));
  });
};