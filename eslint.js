'use strict';

/**
 * ESlint task.
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  let defaultId = 'eslint';
  let defaults = {
    location: './src/js/**/*.js',
    eslint: {
      failAfterError: false
    }
  };

  // Init task with cradle wizard
  let wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  let gulp = require('gulp');
  let gutil = require('gulp-util');
  let eslint = require('gulp-eslint');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function () {
    return gulp.src(config.location)
      .pipe(eslint(config.eslint))
      .pipe(eslint.format())
      .pipe(config.eslint.failAfterError === true ? eslint.failAfterError() : gutil.noop());
  });
};
