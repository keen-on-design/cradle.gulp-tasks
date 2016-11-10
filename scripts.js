'use strict';

module.exports = function() {

  //Processes js files: browserify, uglify and moves to destination folder
  $.gulp.task('js:process', function() {
    return $.gulp.src($.config.js.entryPoint)
      .pipe($.plugins.plumber())
      .pipe($.plugins.browserify($.config.js.config.process.browserify))
      .pipe($.plugins.if($.argv.release,
        $.plugins.uglify()
      ))
      .pipe($.plugins.rename($.config.js.config.process.result))
      .pipe($.plugins.if($.argv.release === undefined,
        $.gulp.dest($.config.js.destinationDev)
      ))
      .pipe($.plugins.if($.argv.release,
        $.gulp.dest($.config.js.destinationRls)
      ));
  });
};