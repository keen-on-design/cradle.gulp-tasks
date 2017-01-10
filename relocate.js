'use strict';

/**
 * Creates a relocate task. Moves files from one location to another
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  let defaultId = 'relocate';
  let defaults = {
    location: './src/dummy/**/*.',
    destination: {
      production: './build/dummy',
      development: './build/dummy'
    }
  };

  // Init task with cradle wizard
  let wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  let gulp = require('gulp');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function () {
    return gulp.src(config.location)
      .pipe($.env.production ? gulp.dest(config.destination.production) : gulp.dest(config.destination.development));
  });
};
