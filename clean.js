'use strict';

/**
 * Directory cleaner task.
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  const defaultId = 'clean';
  const defaults = {
    destination: './build/js'
  };

  // Init task with cradle wizard
  const wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  const gulp = require('gulp');
  const del = require('del');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function (cb) {
    return del([config.destination], {
      force: $.env.force
    }, cb);
  });
};
