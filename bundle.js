'use strict';

/**
 * Creates a bundler task
 * @param {String} [id=js:bundle] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  let
    // Default config
    defaultId = 'js:bundle',
    defaults = {
      entryPoint: './src/js/app.js',
      destination: {
        production:  './build/js',
        development: './build/js',
      },
      browserify: { },
      sourcemaps: {loadMaps: true},
      output: 'bundle.js',
    },
    // Init task with cradle wizard
    wizard = require('./utils/c.wizard')(id, defaultId, config, defaults),
    // Task dependencies
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    _ = require('underscore'),
    vendors,
    bundler;
  vendors = _.keys($.package.dependencies);

  id     = wizard.getId();
  config = wizard.getConfig();

  gulp.task(id, function () {
    bundler = browserify(_.extend({
      debug: $.env.debug
    }, config.browserify));

    _.each(vendors, function (vendor) {
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
      .pipe($.env.production ? gulp.dest(config.destination.production) : gulp.dest(config.destination.development));
  });
};
