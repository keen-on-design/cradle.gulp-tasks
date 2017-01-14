'use strict';

/**
 * Creates a sass processor task.
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  let defaultId = 'sass';
  let defaults = {
    location: './src/scss/**/*.scss',
    entryPoint: './src/scss/style.scss',
    destination: {
      production: './build/css',
      development: './build/css'
    },
    sass: {},
    autoprefixer: {
      browser: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']
    }
  };

  // Init task with cradle wizard
  let wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  let gulp = require('gulp');
  let gutil = require('gulp-util');
  let sass = require('gulp-sass');
  let rename = require('gulp-rename');
  let strip = require('gulp-strip-json-comments');
  let autoprefixer = require('gulp-autoprefixer');
  let sourcemaps = require('gulp-sourcemaps');
  let _ = require('underscore');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function () {
    return gulp.src(config.entryPoint)
      .pipe($.env.production ? gutil.noop() : sourcemaps.init(config.sourcemaps))
      .pipe($.env.production ? sass(_.extend({outputStyle: 'compressed'}, config.sass)) : sass(_.extend({outputStyle: 'nested'}, config.sass))).on('error', sass.logError)
      .pipe($.env.production ? strip() : gutil.noop())
      .pipe(autoprefixer(config.autoprefixer))
      .pipe($.env.production ? rename({suffix: '.min'}) : gutil.noop())
      .pipe($.env.production ? gutil.noop() : sourcemaps.write())
      .pipe($.env.production ? gulp.dest(config.destination.production) : gulp.dest(config.destination.development))
      .pipe($.browserSync.stream());
  });
};
