'use strict';

/**
 * Creates a relocate task. Moves files from one location to another
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  const defaultId = 'relocate';
  const defaults = {
    location: './build/**/*.*',
    destination: './public/'
  };

  // Init task with cradle wizard
  const wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  const gulp = require('gulp');
  const copy = require('copy');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function () {
    return gulp.src(config.location)
      .pipe(gulp.dest(config.destination));
  });
};
