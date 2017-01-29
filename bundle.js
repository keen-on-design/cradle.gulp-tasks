'use strict';

/**
 * Browserify vendors bundle task.
 * @param {String} [id=js:bundle] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  const defaultId = 'js:bundle';
  const defaults = {
    entryPoint: './src/js/app.js',
    destination: {
      production: './build/js',
      development: './build/js'
    },
    browserify: { },
    sourcemaps: {loadMaps: true},
    output: 'bundle.js',
    vendors: []
  };

  // Init task with cradle wizard
  const wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  const gulp = require('gulp');
  const gutil = require('gulp-util');
  const browserify = require('browserify');
  const uglify = require('gulp-uglify');
  const source = require('vinyl-source-stream');
  const buffer = require('vinyl-buffer');
  const plumber = require('gulp-plumber');
  const sourcemaps = require('gulp-sourcemaps');
  const _ = require('underscore');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function () {
    const bundler = browserify(_.extend({debug: $.env.debug}, config.browserify));

    _.each(config.vendors, function (vendor) {
      bundler.require(vendor);
    });

    return bundler.bundle()
      .pipe(plumber())
      .pipe(source(config.output))
      .pipe(buffer())
      .pipe($.env.production ? gutil.noop() : sourcemaps.init(config.sourcemaps))
      .pipe($.env.production ? uglify() : gutil.noop())
      .pipe($.env.production ? gutil.noop() : sourcemaps.write('./'))
      .pipe(gulp.dest($.env.production ? config.destination.production : config.destination.development));
  });
};
