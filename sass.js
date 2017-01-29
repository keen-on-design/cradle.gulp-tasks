'use strict';

/**
 * Creates a sass processor task.
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  const defaultId = 'sass';
  const defaults = {
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
  const wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  const gulp = require('gulp');
  const gutil = require('gulp-util');
  const sass = require('gulp-sass');
  const strip = require('gulp-strip-json-comments');
  const autoprefixer = require('gulp-autoprefixer');
  const sourcemaps = require('gulp-sourcemaps');
  const _ = require('underscore');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function () {
    return gulp.src(config.entryPoint)
      .pipe($.env.production ? gutil.noop() : sourcemaps.init(config.sourcemaps))
      .pipe($.env.production ? sass(_.extend({outputStyle: 'compressed'}, config.sass)) : sass(_.extend({outputStyle: 'nested'}, config.sass))).on('error', sass.logError)
      .pipe($.env.production ? strip() : gutil.noop())
      .pipe(autoprefixer(config.autoprefixer))
      .pipe($.env.production ? gutil.noop() : sourcemaps.write())
      .pipe($.env.production ? gulp.dest(config.destination.production) : gulp.dest(config.destination.development))
      .pipe($.browserSync.stream());
  });
};
