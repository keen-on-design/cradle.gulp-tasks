'use strict';

/**
 * Browserify + uglify task.
 * @param {String} [id=js:scripts] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  const defaultId = 'browserify';
  const defaults = {
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
  const wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  const gulp = require('gulp');
  const gutil = require('gulp-util');
  const plumber = require('gulp-plumber');
  const browserify = require('browserify');
  const uglify = require('gulp-uglify');
  const source = require('vinyl-source-stream');
  const buffer = require('vinyl-buffer');
  const sourcemaps = require('gulp-sourcemaps');
  const _ = require('underscore');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function () {
    const bundler = browserify(_.extend({
      entries: config.entryPoint,
      debug: $.env.debug,
      plugin: config.plugins,
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
      .pipe($.env.production ? gutil.noop() : sourcemaps.write('./'))
      .pipe($.env.production ? gulp.dest(config.destination.production) : gulp.dest(config.destination.development));
  });
};
