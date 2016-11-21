'use strict';

var browserify = require('browserify'),
  source       = require('vinyl-source-stream'),
  buffer       = require('vinyl-buffer'),
  sourcemaps   = require('gulp-sourcemaps'),
  gutil        = require('gulp-util'),

  //Get global config
  config       = $.config.js,
  vendors      = config.bundle.vendors;

module.exports = function() {

  //Build vendors to separate package
  $.gulp.task('js:bundle', function() {
    var b = browserify({
      debug: !$.releaseFlag
    });

    vendors.forEach(function(lib) {
      b.require(lib);
    });

    return b.bundle()
      .pipe($.plugins.plumber())
      .pipe(source(config.bundle.result))
      .pipe(buffer())
      .pipe($.releaseFlag ? gutil.noop() : sourcemaps.init({loadMaps: true}))
      .pipe($.releaseFlag ? $.plugins.uglify() : gutil.noop())
      .pipe($.releaseFlag ? gutil.noop() : sourcemaps.write('./'))
      .pipe($.releaseFlag ? $.gulp.dest(config.destinationRls) : $.gulp.dest(config.destinationDev));
  });

  //Build app
  $.gulp.task('js:app', function() {
    var b = browserify({
      entries : config.entryPoint,
      debug   : !$.releaseFlag
    });

    vendors.forEach(function(lib) {
      b.external(lib);
    });

    return b.bundle()
      .pipe($.plugins.plumber())
      .pipe(source(config.app.result))
      .pipe(buffer())
      .pipe($.releaseFlag ? gutil.noop() : sourcemaps.init({loadMaps: true}))
      .pipe($.releaseFlag ? $.plugins.uglify() : gutil.noop())
      .pipe($.releaseFlag ? gutil.noop() : sourcemaps.write('./'))
      .pipe($.releaseFlag ? $.gulp.dest(config.destinationRls) : $.gulp.dest(config.destinationDev));
  });
};