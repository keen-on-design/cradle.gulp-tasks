'use strict';

/**
 * Creates a directory cleaner task
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  let defaultId = 'clean';
  let defaults = {
    destination: './build/js'
  };

  // Init task with cradle wizard
  let wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  let gulp = require('gulp');
  let del = require('del');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function (cb) {
    return del([config.destination], cb);
  });
};
