'use strict';

/**
 * Browsersync server task.
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  let defaultId = 'serve';
  let defaults = {
    server: {
      open: false,
      server: './build/'
    },
    watch: ['./build/**/*.*', '!**/*.css']
  };

  // Init task with cradle wizard
  let wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  let gulp = require('gulp');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function () {
    $.browserSync.init(config.server);
    $.browserSync.watch(config.watch, $.browserSync.reload);
  });
};
