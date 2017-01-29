'use strict';

/**
 * Image processor task. Relocate + imagemin.
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  const defaultId = 'images';
  const defaults = {
    location: './src/images/**/*',
    destination: {
      production: './build/images',
      development: './build/images'
    },
    imagemin: {
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }
  };

  // Init task with cradle wizard
  const wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  const gulp = require('gulp');
  const gutil = require('gulp-util');
  const cache = require('gulp-cache');
  const imagemin = require('gulp-imagemin');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function () {
    return gulp.src(config.location)
      .pipe($.env.production ? cache(imagemin(config.imagemin)) : gutil.noop())
      .pipe($.env.production ? gulp.dest(config.destination.production) : gulp.dest(config.destination.development));
  });
};
