'use strict';
var gulp = require('gulp'),
  gutil  = require('gulp-util'),
  wizard = require('./utils/c.wizard'),

  sass         = require('gulp-sass'),
  rename       = require('gulp-rename'),
  strip        = require('gulp-strip-json-comments'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps   = require('gulp-sourcemaps'),
  _            = require('underscore'),

  // Default config
  defaults     = {
    location    : './src/scss/**/*.scss',
    entryPoint  : './src/scss/style.scss',
    destination : {
      production  : './build/css',
      development : './build/css'
    },
    sass : {},
    autoprefixer : {
      browser: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']
    }
  };

/**
 * Creates a sass processor task.
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 * @return {Function}
 */
module.exports = function (id, config) {
  var wizard = require('./utils/c.wizard')(id, 'sass:process', config, defaults);

  id     = wizard.getId();
  config = wizard.getConfig();

  gulp.task(id, function () {
    return gulp.src(config.entryPoint)
      .pipe($.env.production ? gutil.noop() : sourcemaps.init(config.sourcemaps))
      .pipe($.env.production ? sass(_.extend({outputStyle: 'compressed'}, config.sass)) : sass(_.extend({outputStyle: 'nested'}, config.sass))).on('error', sass.logError)
      .pipe($.env.production ? strip() : gutil.noop())
      .pipe(autoprefixer(config.autoprefixer))
      .pipe($.env.production ? rename({suffix : '.min'}) : gutil.noop())
      .pipe($.env.production ? gutil.noop() : sourcemaps.write())
      .pipe($.env.production ? gulp.dest(config.destination.production) : gulp.dest(config.destination.development));
  });
};