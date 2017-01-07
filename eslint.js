'use strict';
var gulp = require('gulp'),
  gutil  = require('gulp-util'),
  wizard = require('./utils/c.wizard'),
  eslint = require('gulp-eslint'),

  // Default config
  defaults     = {
    location    : './src/js/**/*.js',
    eslint : {
      failAfterError : false
    }
  };

/**
 * Creates a ESlint task.
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 * @return {Function}
 */
module.exports = function (id, config) {
  var wizard = require('./utils/c.wizard')(id, 'eslint', config, defaults);

  id     = wizard.getId();
  config = wizard.getConfig();

  gulp.task(id, function () {
    return gulp.src(config.location)
      .pipe(eslint(config.eslint))
      .pipe(eslint.format())
      .pipe(config.eslint.failAfterError === true ? eslint.failAfterError() : gutil.noop());
  });
};