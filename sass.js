'use strict';

module.exports = function () {

  //Compiles sass files to css with auto prefix
  $.gulp.task('sass:process', function (cb) {
    return $.gulp.src($.config.sass.entryPoint)
      .pipe($.plugins.if($.argv.release === undefined,
        $.plugins.sourcemaps.init()
      ))
      .pipe($.plugins.if($.argv.release,
        $.plugins.sass($.config.sass.config.rls)
      )).on('error', $.plugins.sass.logError)
      .pipe($.plugins.if($.argv.release === undefined,
        $.plugins.sass($.config.sass.config)
      )).on('error', $.plugins.sass.logError)
      .pipe($.plugins.if($.argv.release,
        $.plugins.stripJsonComments()
      ))
      .pipe($.plugins.autoprefixer($.config.sass.config.autoprefixer.config))
      .pipe($.plugins.if($.argv.release === undefined, $.plugins.sourcemaps.write()))
      .pipe($.plugins.if($.argv.release === undefined, $.gulp.dest($.config.sass.destinationDev)))
      .pipe($.plugins.if($.argv.release, $.gulp.dest($.config.sass.destinationRls)))
      .pipe($.plugins.if($.argv.release === undefined, $.browserSync.stream()));
  });
};