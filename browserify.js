'use strict';

/**
 * Browserify + uglify task.
 * @param {String} [id=js:scripts] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  let defaultId = 'browserify';
  let defaults = {
    location: './src/js/**/*.js',
    entryPoint: './src/js/main.js',
    destination: {
      production: './build/js',
      development: './build/js'
    },
    output: 'main.js',
    browserify: {},
    sourcemaps: {loadMaps: true}
  };

  // Init task with cradle wizard
  let wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  let gulp = require('gulp');
  let gutil = require('gulp-util');
  let plumber = require('gulp-plumber');
  let browserify = require('browserify');
  let uglify = require('gulp-uglify');
  let rename = require('gulp-rename');
  let source = require('vinyl-source-stream');
  let buffer = require('vinyl-buffer');
  let sourcemaps = require('gulp-sourcemaps');
  let _ = require('underscore');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function () {
    let bundler = browserify(_.extend({
      entries: config.entryPoint,
      debug: $.env.debug,
      transform: config.transform,
    }, config.browserify));

    _.each(config.vendors, function (vendor) {
      bundler.external(vendor);
    });

    return bundler.bundle()
      .pipe(plumber())
      .pipe(source(config.output))
      .pipe(buffer())
      .pipe($.env.production ? gutil.noop() : sourcemaps.init(config.sourcemaps))
      .pipe($.env.production ? uglify() : gutil.noop())
      .pipe($.env.production ? rename({suffix: '.min'}) : gutil.noop())
      .pipe($.env.production ? gutil.noop() : sourcemaps.write('./'))
      .pipe($.env.production ? gulp.dest(config.destination.production) : gulp.dest(config.destination.development));
  });
};
