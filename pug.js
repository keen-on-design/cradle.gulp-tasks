'use strict';

module.exports = function () {

  //Compiles pug templates
  $.gulp.task('pug:process', function () {
    return $.gulp.src($.config.pug.compiled)
      .pipe($.plugins.plumber())
      .pipe($.plugins.pug($.config.pug.config))
      .pipe($.plugins.useref())
      .pipe($.plugins.if('*.js',
        $.plugins.if($.argv.release, $.plugins.uglify())
      ))
      .pipe($.plugins.if('*.css',
        $.plugins.if($.argv.release, $.plugins.cssnano())
      ))
      .pipe($.plugins.if($.argv.release,
        $.gulp.dest($.config.pug.destinationRls)
      ))
      .pipe($.plugins.if($.argv.release === undefined,
        $.gulp.dest($.config.pug.destinationDev)
      ));
  });
};