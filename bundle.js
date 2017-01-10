'use strict';

/**
 * Browserify vendors bundle task.
 * @param {String} [id=js:bundle] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  let defaultId = 'js:bundle';
  let defaults = {
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
  let wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  let gulp = require('gulp');
  let gutil = require('gulp-util');
  let rename = require('gulp-rename');
  let browserify = require('browserify');
  let uglify = require('gulp-uglify');
  let source = require('vinyl-source-stream');
  let buffer = require('vinyl-buffer');
  let plumber = require('gulp-plumber');
  let sourcemaps = require('gulp-sourcemaps');
  let _ = require('underscore');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function () {
    let bundler = browserify(_.extend({debug: $.env.debug}, config.browserify));

    _.each(config.vendors, function (vendor) {
      bundler.require(vendor);
    });

    return bundler.bundle()
      .pipe(plumber())
      .pipe(source(config.output))
      .pipe(buffer())
      .pipe($.env.production ? gutil.noop() : sourcemaps.init(config.sourcemaps))
      .pipe($.env.production ? uglify() : gutil.noop())
      .pipe($.env.production ? rename({suffix: '.min'}) : gutil.noop())
      .pipe($.env.production ? gutil.noop() : sourcemaps.write('./'))
      .pipe(gulp.dest($.env.production ? config.destination.production : config.destination.development));
  });
};
