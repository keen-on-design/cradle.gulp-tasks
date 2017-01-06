'use strict';

var gulp       = require('gulp'),
  gutil        = require('gulp-util'),
  rename       = require('gulp-rename'),
  browserify   = require('browserify'),
  uglify       = require('gulp-uglify'),
  source       = require('vinyl-source-stream'),
  buffer       = require('vinyl-buffer'),
  plumber      = require('gulp-plumber'),
  sourcemaps   = require('gulp-sourcemaps'),
  _            = require('underscore'),

  // Default config
  defaults     = {
    location    : './src/js/**/*.js',
    entryPoint  : './src/js/main.js',
    destination : {
      production  : './build/js',
      development : './build/js'
    },
    output     : 'main.js',
    browserify : {},
    sourcemaps : {loadMaps: true}
  };

/**
 * Creates a scripts task
 * @param {String} [id=js:scripts] Id of a task
 * @param {Object} [config={}] Task config
 * @return {Stream}
 */
module.exports = function (id, config) {
  var wizard = require('./utils/c.wizard')(id, 'js:scripts', config, defaults),
    vendors = _.keys($.package.dependencies);

  id     = wizard.getId();
  config = wizard.getConfig();

  //Build app
  gulp.task(id, function () {
    var bundler = browserify(_.extend({
      entries : config.entryPoint,
      debug   : $.env.debug
    }, config.browserify));

    _.each(vendors, function (vendor) {
      bundler.external(vendor);
    });

    return bundler.bundle()
      .pipe(plumber())
      .pipe(source(config.output))
      .pipe(buffer())
      .pipe($.env.production ? gutil.noop() : sourcemaps.init(config.sourcemaps))
      .pipe($.env.production ? uglify() : gutil.noop())
      .pipe($.env.production ? rename({suffix : '.min'}) : gutil.noop())
      .pipe($.env.production ? gutil.noop() : sourcemaps.write('./'))
      .pipe($.env.production ? gulp.dest(config.destination.production) : gulp.dest(config.destination.development));
  });
};