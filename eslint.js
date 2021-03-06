'use strict';

/**
 * ESlint task.
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  const defaultId = 'eslint';
  const defaults = {
    location: './src/js/**/*.js',
    eslint: {
      failAfterError: false
    }
  };

  // Init task with cradle wizard
  const wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  const gulp = require('gulp');
  const gutil = require('gulp-util');
  const eslint = require('gulp-eslint');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function () {
    return gulp.src(config.location)
      .pipe(eslint(config.eslint))
      .pipe(eslint.format())
      .pipe(config.eslint.failAfterError === true ? eslint.failAfterError() : gutil.noop());
  });
};
